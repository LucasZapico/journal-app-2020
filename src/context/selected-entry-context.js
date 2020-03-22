import React, { createContext, useContext, useState } from 'react';

export const SelectedEntryContext = createContext();
export const SelectedEntryProvider = ({ children }) => {
  // default to last
  const [selectedEntry, setSelectedEntry] = useState({
    title: '',
    entryBody: '',
  });

  return (
    <SelectedEntryContext.Provider
      value={{ selectedEntry, setSelectedEntry }}
    >
      {children}
    </SelectedEntryContext.Provider>
  );
};

export const useSelectedEntryValue = () =>
  useContext(SelectedEntryContext);
