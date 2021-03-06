import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  useFirebaseValue,
  FirebaseContext,
  useAuthValue,
} from '../context';
import { gettingStartedEntry } from '../constants/getting-started-entry';
import { sortBy } from 'lodash';

export const useEntries = () => {
  const { currentUser } = useAuthValue();
  const firebase = useFirebaseValue(FirebaseContext);
  const [entries, setEntries] = useState([]);

  if (currentUser != null) {
  }

  useEffect(() => {
    console.log('current user', currentUser);
    if (currentUser) {
      firebase.db
        .collection('entries')
        .where('user', '==', currentUser.email)
        .get()
        .then(snapshot => {
          const allEntries = snapshot.docs.map(entry => ({
            ...entry.data(),
            entryId: entry.id,
          }));
          const allEntriesDateSort = sortBy(allEntries, [
            obj => obj.dateCreated,
          ]).reverse();
          console.log('all entries', allEntries);

          if (
            JSON.stringify(allEntriesDateSort) !==
            JSON.stringify(entries)
          ) {
            setEntries(allEntriesDateSort);
          }
        });
    }
  }, [entries, currentUser]);

  // set first user getting started guid
  if (entries.length != 0) {
    return { entries, setEntries };
  } else {
    let dateCreated = new Date();
    dateCreated = moment(dateCreated).format('MM/DD/YYYY');
    let gettingStarted = {
      ...gettingStartedEntry,
      dateCreated: dateCreated,
    };
    setEntries([...entries, gettingStarted]);
    return { entries, setEntries };
    console.log('no entries ', entries);
  }
};

// get window width on resize hook
const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const useCurrentWidth = () => {
  let [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  return width;
};
