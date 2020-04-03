import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  useFirebaseValue,
  FirebaseContext,
  useAuthValue,
} from '../context';

export const useEntries = () => {
  const { currentUser } = useAuthValue();
  console.log('firebase', currentUser);
  const firebase = useFirebaseValue(FirebaseContext);
  const [entries, setEntries] = useState([]);

  if (currentUser != null) {
  }

  useEffect(() => {
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
  return { entries, setEntries };
};
