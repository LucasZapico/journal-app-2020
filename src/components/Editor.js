import React, { useState, useEffect, useRef } from 'react';
import {
  useSelectedEntryValue,
  useFirebaseValue,
  FirebaseContext,
  useEntriesValue,
} from '../context';
import moment from 'moment';
import { FaTrashAlt, FaSyncAlt } from 'react-icons/fa';
import { generateCleanTags, parseCategories } from '../helpers';

const Editor = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  const { entries, setEntries } = useEntriesValue();
  const { selectedEntry, setSelectedEntry } = useSelectedEntryValue();
  const [entry, setEntry] = useState({ title: '', entryBody: '' });
  const [entryInterval, setEntryInterval] = useState(entry);
  const textArea = useRef();
  const [entryChanged, setEntryChanged] = useState(false);
  const categoryRex = /^__?c__([^\s])__?c__|^__?c__([^\s][\s\S]*?[^\s])__?c__/gim;
  const titleRex = /^ {0,3}(#{1}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/gim;
  let numberOfChanges = Math.abs(
    entryInterval.entryBody.length - entry.entryBody.length,
  );

  const updateEntry = e => {
    let dateUpdated = new Date();
    dateUpdated = moment(dateUpdated, 'LLL').format();
    firebase.db
      .collection('entries')
      .doc(entry.entryId)
      .update(entry)
      .then(() => {
        setSelectedEntry(prevEntry => {
          return { ...prevEntry, dateUpdated: dateUpdated };
        });
        setEntries([...entries]);
        setEntryInterval(entry);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    reSizeTextArea(textArea);
    if (numberOfChanges > 5) {
      setEntryInterval(selectedEntry);
      updateEntry();
    }
    if (entryChanged) {
      setSelectedEntry(selectedEntry);
    }
    console.log('upded', selectedEntry);
  }, [selectedEntry]);

  const deleteEntry = e => {
    firebase.db
      .collection('entries')
      .doc(selectedEntry.entryId)
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

  const updateEntryBody = e => {
    let body = e.target.value;
    let categoriesSet = new Set();
    let newCat = [];
    let newBody = body;

    // handle title

    let newTitle = titleRex.exec(body);
    if (newTitle != null) {
      setSelectedEntry(prevEntry => {
        return { ...prevEntry, title: newTitle[2] };
      });
      // setEntryChanged(true);
    }

    // update date stamp
    if (body.includes('add-date-created')) {
      let formatedDate = moment(selectedEntry.dateCreated).format(
        'MMMM/DD/YYYY',
      );
      let newStr = `date-created ${formatedDate}`;

      newBody = newBody.replace('add-date-created', newStr);

      setEntryChanged(true);
      console.log('test', selectedEntry.entryBody);
      console.log('newbody', newBody);
    }

    // get all instance of elements with category syntax
    while ((newCat = categoryRex.exec(body)) != null) {
      // handle multiple categories defined in single syntax block
      let tmpArr = newCat[2].split(',');
      tmpArr.forEach(el =>
        // clean for consistency
        categoriesSet.add(
          el
            .toLowerCase()
            .trim()
            .replace(' ', '-'),
        ),
      );
    }
    if (categoriesSet) {
      let newCategories = Array.from(categoriesSet);
      console.log(categoriesSet);
      setSelectedEntry(prevEntry => {
        return { ...prevEntry, categories: newCategories };
      });
      setEntryChanged(true);
    }

    setSelectedEntry(prevEntry => {
      return { ...prevEntry, entryBody: newBody };
    });
    setEntry(selectedEntry);
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

  const removeCat = el => {
    let newCategories = selectedEntry.categories.filter(
      cat => cat !== el,
    );
    setSelectedEntry(prevEntry => {
      return { ...prevEntry, categories: newCategories };
    });
    setEntry(selectedEntry);
    setEntryChanged(true);
  };

  return (
    <div className="editor margin--hor">
      {selectedEntry ? (
        <>
          <div className="char-80 categories padding--vert padding--left">
            <h4>{selectedEntry.title}</h4>
          </div>
          <textarea
            autoComplete="off"
            aria-label="Journal Entry"
            type="text"
            ref={textArea}
            value={selectedEntry.entryBody}
            onChange={e => updateEntryBody(e)}
          ></textarea>
          <div className="char-80 categories padding--vert">
            {selectedEntry.categories
              ? selectedEntry.categories.map(cat => (
                  <li className="category">{cat}</li>
                ))
              : undefined}
          </div>
          <div className="entry-functions">
            <button className="margin--all btn" onClick={updateEntry}>
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
