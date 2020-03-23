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
  const {
    setSelectedEntry,
    setSelectedCategory,
    selectedCategory,
  } = useSelectedEntryValue();
  const entryId = generatePushId();
  const newId = generatePushId();
  const [isNewEntry, setIsNewEntry] = useState(false);
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

  useEffect(() => {
    setSelectedEntry(entry);
  }, [entry, setSelectedEntry]);

  useEffect(() => {
    if (isNewEntry === true) {
      addEntry();
      setIsNewEntry(false);
    }
    console.log('new entry', entry, 'new entry', isNewEntry);
  }, [entry]);

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
      <Link
        className="home"
        to="/"
        onClick={() =>
          setSelectedEntry({
            title: '',
            entryBody: '',
          })
        }
      >
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
              <Link key={entri.entryId} to="/">
                {' '}
                <li
                  key={entri.entryId}
                  className="items"
                  onClick={() => {
                    console.log('clicked', entri);
                    setSelectedEntry(entri);
                  }}
                >
                  <span className="margin--right">
                    {toTitleCase(entri.title)}{' '}
                  </span>
                  <FaFileAlt />
                </li>
              </Link>
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
          to="/list-entries"
          className="btn btn--secondary margin-vert"
          onClick={() => setSelectedCategory('')}
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
                <Link key={cat + newId} to="/list-entries">
                  {' '}
                  <li
                    className={
                      selectedCategory === cat
                        ? 'category category__selected'
                        : 'category'
                    }
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </li>
                </Link>
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
      <button
        className="margin--top"
        onClick={() => {
          setIsNewEntry(!isNewEntry);
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
        }}
      >
        New Entry
      </button>
    </div>
  );
};

export default Sidebar;
