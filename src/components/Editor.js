import React, { useState, useEffect } from 'react';
import {
  useSelectedEntryValue,
  useFirebaseValue,
  FirebaseContext,
  useEntriesValue,
} from '../context';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import { generateCleanTags } from '../helpers';

const Editor = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  const { entries, setEntries } = useEntriesValue();
  const { selectedEntry, setSelectedEntry } = useSelectedEntryValue();

  const [entry, setEntry] = useState({ title: '', entryBody: '' });

  useEffect(() => {
    if (selectedEntry) {
      setEntry(selectedEntry);
    }
  }, [selectedEntry]);

  const updateEntry = e => {
    firebase.db
      .collection('entries')
      .doc(entry.entryId)
      .update(entry)
      .catch(err => console.error(err));
  };

  const deleteEntry = e => {
    firebase.db
      .collection('entries')
      .doc(entry.entryId)
      .delete()
      .then(() => {
        setEntries([...entries]);
      })
      .catch(err => console.error(err));
  };
  // Todo:  Make parse
  // const parseBody = str => {
  //   let result = '';
  //   if (str.length > 0) {
  //     str.split(' ');
  //   }

  //   console.log('body parser', result);
  // };
  const renderCategories = catArr => {
    catArr.map(cat => (
      <span className="categories__item">{cat}</span>
    ));
  };

  return (
    <div id="editor" className="margin--hor">
      {selectedEntry ? (
        <>
          <input
            onChange={e => {
              setSelectedEntry(prevEntry => {
                return { ...prevEntry, title: e.target.value };
              });
            }}
            type="text"
            value={selectedEntry.title}
          ></input>
          <input
            className="categories"
            type="text"
            placeholder="categories"
            value={selectedEntry.categories}
            onChange={e => {
              setSelectedEntry(prevEntry => {
                return {
                  ...prevEntry,
                  categories: generateCleanTags(e.target.value),
                };
              });
            }}
          ></input>
          <textarea
            autoComplete="off"
            aria-label="Journal Entry"
            type="text"
            value={selectedEntry.entryBody}
            onChange={e => {
              let dateUpdated = new Date();
              dateUpdated = moment(dateUpdated, 'LLL').format();
              setSelectedEntry({
                ...selectedEntry,
                dateUpdated: dateUpdated,
                entryBody: e.target.value,
              });
            }}
          ></textarea>
          <button className="margin--all" onClick={updateEntry}>
            Save Entry
          </button>
          <button
            className="btn btn--secondary margin--all"
            onClick={deleteEntry}
          >
            <FaTrashAlt />
            <span className="margin--left">Delete Entry Entry</span>
          </button>
        </>
      ) : (
        <div className="loading">
          <div className="p"></div>
          <div className="p"></div>
          <div className="p"></div>
          <div className="p"></div>
        </div>
      )}
    </div>
  );
};

export default Editor;
