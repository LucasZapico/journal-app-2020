import React, { useState, useEffect } from 'react';
import {
  useEntriesValue,
  useSelectedEntryValue,
  useFirebaseValue,
  FirebaseContext,
} from '../context';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { intersection } from 'lodash';

const ListEntries = () => {
  const {
    setSelectedEntry,
    selectedCategory,
  } = useSelectedEntryValue();
  const firebase = useFirebaseValue(FirebaseContext);
  const { entries, setEntries } = useEntriesValue();
  const [entryList, setEntryList] = useState(entries);
  const [confirmDelete, setConfirmDelete] = useState(0);

  useEffect(() => {
    setEntryList(entries);
  }, [entries]);

  // listen for changes on categories and update list
  useEffect(() => {
    console.log('selec-cat', selectedCategory);
    let entriesFilted = '';
    if (entries.length > 0 && selectedCategory !== '') {
      entriesFilted = entries.filter(
        entri =>
          //

          intersection(entri.categories, selectedCategory).length ===
          selectedCategory.length,
      );
      setEntryList(entriesFilted);
    } else {
      setEntryList(entries);
    }

    console.log('entrylist', entryList, 'category', selectedCategory);
  }, [selectedCategory]);

  const deleteEntry = entry => {
    firebase.db
      .collection('entries')
      .doc(entry.entryId)
      .delete()
      .then(() => {
        setEntries([...entries]);
      })
      .catch(err => console.error(err));
  };

  const confirmDeleteEntry = entry => {
    if (confirmDelete == 0) {
      setConfirmDelete(prev => prev + 1);
    } else {
      deleteEntry(entry);
      setConfirmDelete(0);
    }
  };

  return (
    <div className="entries">
      {entryList &&
        entryList.map(entry => (
          <div
            key={entry.entryId}
            className="entry margin--all margin--bottom__m"
            onClick={() => setSelectedEntry(entry)}
          >
            <Link to="/">
              <h5 className="margin--vert">{entry.title}</h5>
              <div>
                <p className="type-color--secondary milli margin--kill">
                  Date Created :{' '}
                  {moment(entry.dateCreated).format('MM/DD/YY')}
                </p>
                <p className="type-color--secondary milli margin--kill">
                  Last Updated :{' '}
                  {moment(entry.dateUpdated).format('MM/DD/YY')}
                </p>
              </div>
            </Link>
            <div className="entry-card--actions">
              <button
                className="btn btn--secondary margin--top__m actions--delete "
                onClick={() => confirmDeleteEntry(entry)}
              >
                <FaTrashAlt />
                {confirmDelete ? (
                  <span className="margin--left">
                    Confirm Delete Entry
                  </span>
                ) : (
                  undefined
                )}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListEntries;
