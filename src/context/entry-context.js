import React, { createContext, useContext } from 'react';
import { useEntries } from '../hooks';

export const EntriesContext = createContext();
export const EntriesProvider = ({ children }) => {
  const { entries, setEntries } = useEntries();
  console.log('entries', entries);
  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntriesValue = () => useContext(EntriesContext);
