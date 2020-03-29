import React, { useState, useEffect, useRef } from 'react';
import {
  useSelectedEntryValue,
  useFirebaseValue,
  FirebaseContext,
  useEntriesValue,
} from '../context';
import moment from 'moment';
import { FaTrashAlt, FaSyncAlt } from 'react-icons/fa';
import { generateCleanTags } from '../helpers';

const Editor = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  const { entries, setEntries } = useEntriesValue();
  const { selectedEntry, setSelectedEntry } = useSelectedEntryValue();
  const [entry, setEntry] = useState({ title: '', entryBody: '' });
  const [entryInterval, setEntryInterval] = useState(entry);
  const textArea = useRef();

  let numberOfChanges = Math.abs(
    entryInterval.entryBody.length - entry.entryBody.length,
  );

  const updateEntry = e => {
    firebase.db
      .collection('entries')
      .doc(entry.entryId)
      .update(entry)
      .then(() => {
        setEntries([...entries]);
        setEntryInterval(entry);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (selectedEntry) {
      setEntry(selectedEntry);
    }
    reSizeTextArea(textArea);
    if (numberOfChanges > 10) {
      setEntryInterval(selectedEntry);
      updateEntry();
    }
    console.log('change', selectedEntry);
  }, [selectedEntry]);

  const passiveUpdate = e => {
    setEntry(prevEntry => {
      if (prevEntry.entryBody) {
      }
    });
  };

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

  const reSizeTextArea = el => {
    if (el.current !== undefined) {
      el.current.style.height = 'inherit';
      let newHeight = el.current.scrollHeight * 1.1;
      el.current.style.height = `${newHeight}px`;
    }
  };

  const test = body => {
    let newBody = body;
    // console.log('body', body);

    if (body.includes('date-created')) {
      console.log('includes date', body.indexOf('date-created'));

      let newStr = `date-created ${entry.dateCreated}`;
      console.log(typeof newStr);
      newBody = newBody.replace('date-created', newStr);
      // console.log('newbody', newBody);
    }
    setSelectedEntry(prevEntry => {
      return { ...prevEntry, entryBody: newBody };
    });
    // console.log('test', selectedEntry.entryBody);
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
            ref={textArea}
            value={selectedEntry.entryBody}
            onChange={e => {
              console.log(selectedEntry.entryBody);
              reSizeTextArea(e);
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
          <div>
            <button className="margin--all" onClick={updateEntry}>
              {numberOfChanges !== 0 ? (
                <span>
                  Save {numberOfChanges} changes <FaSyncAlt />
                </span>
              ) : (
                'Saved'
              )}
            </button>
            <button
              className="btn btn--secondary margin--all"
              onClick={deleteEntry}
            >
              <FaTrashAlt />
              <span className="margin--left">Delete Entry Entry</span>
            </button>
          </div>
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
