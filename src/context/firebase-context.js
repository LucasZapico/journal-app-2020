import React, { useCintext, createContext, useContext } from 'react';
import Firebase from '../firebase';

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseValue = () => useContext(FirebaseContext);
