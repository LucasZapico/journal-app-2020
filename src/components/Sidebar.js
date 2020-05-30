import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useFirebaseValue,
  FirebaseContext,
  useSelectedEntryValue,
  useEntriesValue,
  useAuthValue,
} from '../context';
import moment from 'moment';
import { generatePushId, toTitleCase } from '../helpers';
import {
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { union } from 'lodash';
import SignOutButton from './SignOut';
import { useCurrentWidth } from '../hooks';

const Sidebar = () => {
  const width = useCurrentWidth();
  const { entries, setEntries } = useEntriesValue();
  const { currentUser } = useAuthValue();
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
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // sidebar adjustment on view size
  useEffect(() => {
    if (width > 900 && toggleSidebar != true) {
      console.log(width);
      setToggleSidebar(true);
    } else if (width < 900 && toggleSidebar !== false) {
      setToggleSidebar(false);
    }
  }, [width]);

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
        console.log();
        setEntry(prevEntry => {
          return {
            ...prevEntry,
            entryId: docRef.id,
            user: currentUser.email,
          };
        });
        setEntries([...entries]);
      })
      .then(setSelectedEntry(entry))
      .catch(err => console.error(err));
  };

  const handleSelectedCategory = cat => {
    const catSet = new Set(selectedCategory);
    if (selectedCategory.length === 0) {
      // if cat arr empty add
      setSelectedCategory(prevCatArr => [...prevCatArr, cat]);
    } else if (catSet.has(cat)) {
      // category exist in set, then remove

      catSet.delete(cat);
      setSelectedCategory([...Array.from(catSet)]);
    } else {
      setSelectedCategory(prevCatArr => [...prevCatArr, cat]);
      // cat arr greater then 0 and category not in array
    }
  };

  const recent = entries.slice(0, 5);

  return (
    <div
      className={
        toggleSidebar
          ? 'sidebar-wrapper sidebar__show'
          : 'sidebar-wrapper'
      }
    >
      <div
        onClick={() => setToggleSidebar(!toggleSidebar)}
        className="sidebar--toggle__mobile"
      >
        {toggleSidebar ? <FaChevronLeft /> : <FaChevronRight />}
      </div>

      <div className="sidebar ">
        <div>
          <div
            onClick={() => setToggleSidebar(!toggleSidebar)}
            className="sidebar--toggle"
          >
            {toggleSidebar ? <FaChevronLeft /> : <FaChevronRight />}
          </div>
          {/*
      - Recent
      - Categories
      - New Entry
       */}

          <div className="margin--vert">
            <Link to="/">
              <button
                className="margin--vert btn"
                onClick={() => {
                  setIsNewEntry(!isNewEntry);
                  let dateCreated = new Date();

                  dateCreated = moment(dateCreated).format(
                    'MM/DD/YYYY',
                  );
                  setEntry(prevEntry => {
                    return {
                      ...prevEntry,
                      title: `Captains Log ${dateCreated}`,
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
            </Link>
            <div className="menu-list">
              <h5 className="type-color--secondary">Recent</h5>
              <ul className="margin--vert">
                {entries ? (
                  recent.map(entri => (
                    <Link key={entri.entryId} to="/">
                      {' '}
                      <li
                        key={entri.entryId}
                        className="items"
                        onClick={() => {
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
            </div>
            <Link
              to="/list-entries"
              className="btn btn--secondary margin-vert"
              onClick={() => setSelectedCategory('')}
            >
              All Entries
            </Link>
          </div>
          {allCategories.length > 0 ? (
            <div className="margin-vert menu-list">
              <h5 className="type-color--secondary">Categories</h5>
              <div className="categories container margin--vert">
                {allCategories ? (
                  allCategories.map(cat => (
                    <Link key={cat + newId} to="/list-entries">
                      {' '}
                      <li
                        className={
                          selectedCategory.includes(cat)
                            ? 'category category__selected'
                            : 'category'
                        }
                        onClick={() => handleSelectedCategory(cat)}
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
        </div>
        <div className="margin--bottom__l sidebar--signout">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
