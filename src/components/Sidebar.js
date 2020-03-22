import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useFirebaseValue,
  FirebaseContext,
  useSelectedEntryValue,
  useEntriesValue,
} from '../context';
import moment from 'moment';
import { generatePushId, toTitleCase } from '../helpers';
import { FaFileAlt } from 'react-icons/fa';
import { union } from 'lodash';

const Sidebar = () => {
  const { entries, setEntries } = useEntriesValue();
  const firebase = useFirebaseValue(FirebaseContext);
  const { setSelectedEntry } = useSelectedEntryValue();
  const entryId = generatePushId();
  const [entry, setEntry] = useState({
    title: '',
    entryBody: '',
    categories: [],
  });

  // return all categories

  let allCategories = [];
  entries.forEach(en => {
    allCategories = union(allCategories, en.categories);
  });

  console.log(allCategories);

  useEffect(() => {
    setSelectedEntry(entry);
  }, [entry, setSelectedEntry]);

  const addEntry = () => {
    firebase.db
      .collection('entries')
      .add(entry)
      .then(docRef => {
        setEntry(prevEntry => {
          return { ...prevEntry, entryId: docRef.id };
        });
        setEntries([...entries]);
      })
      .then(setSelectedEntry(entry))
      .catch(err => console.error(err));
  };

  const recent = entries.slice(0, 5);

  return (
    <div id="sidebar">
      <Link className="home" to="/">
        <FaFileAlt />
      </Link>
      {/*
      - Recent
      - Categories
      - New Entry
       */}
      <div className="margin--vert">
        <h5 className="type-color--secondary">Recent</h5>
        <ul className="margin--vert">
          {entries && entries.length > 0 ? (
            recent.map(entri => (
              <li
                className="items"
                onClick={() => setSelectedEntry(entri)}
                key={entri.entryId}
              >
                <span className="margin--right">
                  {toTitleCase(entri.title)}{' '}
                </span>
                <FaFileAlt />
              </li>
            ))
          ) : (
            <div className="loading">
              <div className="p"></div>
              <div className="p"></div>
              <div className="p"></div>
            </div>
          )}
        </ul>
        <Link
          to="/all-entries"
          className="btn btn--secondary margin-vert"
        >
          All Entries
        </Link>
      </div>
      {allCategories.length > 0 ? (
        <div className="margin-vert">
          <h5 className="type-color--secondary">Categories</h5>
          <div className="categories container margin--vert">
            {allCategories ? (
              allCategories.map(cat => (
                <li className="category">{cat}</li>
              ))
            ) : (
              <div className="loading">
                <div className="p"></div>
                <div className="p"></div>
                <div className="p"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        undefined
      )}

      <input
        className="margin--top"
        placeholder="Entry Title"
        onChange={e => setEntry({ ...entry, title: e.target.value })}
      ></input>
      <button
        className="margin--top"
        onClick={() => {
          let dateCreated = new Date();
          dateCreated = moment(dateCreated, 'LLL').format();
          setEntry(prevEntry => {
            return {
              ...prevEntry,
              entryId: entryId,
              dateCreated: dateCreated,
              entryBody: '',
              user: 'luca',
            };
          });
          addEntry();
        }}
      >
        New Entry
      </button>
    </div>
  );
};

export default Sidebar;
