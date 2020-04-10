import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  useFirebaseValue,
  FirebaseContext,
  useAuthValue,
} from '../context';

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
          console.log('all entries', allEntries);
          if (
            JSON.stringify(allEntries) !== JSON.stringify(entries)
          ) {
            setEntries(allEntries);
          }
        });
    }
  }, [entries, currentUser]);

  // set first user getting started guid

  return { entries, setEntries };
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
