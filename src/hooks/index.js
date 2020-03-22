import { useState, useEffect } from 'react';
import moment from 'moment';
import { useFirebaseValue, FirebaseContext } from '../context';

export const useEntries = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    firebase.db
      .collection('entries')
      .get()
      .then(snapshot => {
        const allEntries = snapshot.docs.map(entry => ({
          ...entry.data(),
          entryId: entry.id,
        }));
        console.log('all entries', allEntries);
        if (JSON.stringify(allEntries) !== JSON.stringify(entries)) {
          setEntries(allEntries);
        }
      });
  }, [entries]);
  return { entries, setEntries };
};
