import React, { useState, useEffect, useRef } from 'react';
import {
  useSelectedEntryValue,
  useFirebaseValue,
  FirebaseContext,
  useEntriesValue,
} from '../context';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteFBEntry, generateCleanTags } from '../helpers';

const Editor = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  const { entries, setEntries } = useEntriesValue();
  const { selectedEntry, setSelectedEntry } = useSelectedEntryValue();

  const [entry, setEntry] = useState({ title: '', entryBody: '' });
  const prevEntryRef = useRef();

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
      .then(() => {
        setEntries([...entries]);
      })
      .catch(err => console.error(err));
  };

  // const passiveUpdate = e => {
  //   setEntry(prevEntry => {
  //     if (prevEntry.entryBody) {
  //     }
  //   });
  // };

  const deleteEntry = e => {
    firebase.db
      .collection('entries')
      .doc(entry.entryId)
      .delete()
      .then(() => {
        setSelectedEntry({
          title: '',
          entryBody: '',
          categories: [],
        });
        setEntries([...entries]);
      })
      .catch(err => console.error(err));
  };

  const renderCategories = catArr => {
    catArr.map(cat => (
      <span className="categories__item">{cat}</span>
    ));
  };

  const test = body => {
    let newBody = body;
    console.log('body', body);

    if (body.includes('date-created')) {
      console.log('includes date', body.indexOf('date-created'));

      let newStr = `date-created ${entry.dateCreated}`;
      console.log(typeof newStr);
      newBody = newBody.replace('date-created', newStr);
      console.log('newbody', newBody);
    }
    setEntry(prevEntry => {
      return { ...prevEntry, entryBody: newBody };
    });
  };

  return (
    <div id="editor" className="margin--hor">
      {selectedEntry ? (
        <>
          <input
            onChange={e => {
              console.log('editor', entry);
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
              test(e.target.value);
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
