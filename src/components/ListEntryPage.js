import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListEntries from './ListEntries';
import { useSelectedEntryValue } from '../context';

// Todo:  add entry load limit and load more button

const EntryFilterAndSort = () => {
  const {
    setSelectedCategory,
    selectedCategory,
  } = useSelectedEntryValue();
  return (
    <div className="entries-fileter--container">
      {/* {selectedCategory} */}
    </div>
  );
};

const EntriesPage = () => {
  return (
    <div className="entries-page">
      <EntryFilterAndSort />
      <ListEntries />
    </div>
  );
};

export default EntriesPage;
