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

const ListEntries = () => {
  const {
    setSelectedEntry,
    selectedCategory,
  } = useSelectedEntryValue();
  const firebase = useFirebaseValue(FirebaseContext);
  const { entries, setEntries } = useEntriesValue();
  const [entryList, setEntryList] = useState(entries);

  useEffect(() => {
    setEntryList(entries);
  }, [entries]);

  useEffect(() => {
    console.log('selec-cat', selectedCategory);
    let entriesFilted = '';
    if (entries.length > 0 && selectedCategory !== '') {
      entriesFilted = entries.filter(entri =>
        entri.categories.includes(selectedCategory),
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
                <h6 className="type-color--secondary milli">
                  Date Created :{' '}
                  {moment(entry.dateCreated).format('MM/DD/YY')}
                </h6>
                <h6 className="type-color--secondary milli">
                  Last Updated :{' '}
                  {moment(entry.dateUpdated).format('MM/DD/YY')}
                </h6>
              </div>
            </Link>
            <button
              className="btn btn--secondary margin--all"
              onClick={() => deleteEntry(entry)}
            >
              <FaTrashAlt />
              <span className="margin--left">Delete Entry Entry</span>
            </button>
          </div>
        ))}
    </div>
  );
};

export default ListEntries;
