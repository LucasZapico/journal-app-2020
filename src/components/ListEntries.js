import React, { useState, useEffect } from 'react';
import { useEntriesValue, useSelectedEntryValue } from '../context';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ListEntries = () => {
  const {
    setSelectedEntry,
    selectedCategory,
  } = useSelectedEntryValue();
  const { entries } = useEntriesValue();
  const [entryList, setEntryList] = useState(entries);

  useEffect(() => {
    setEntryList(entries);
  }, [entries]);

  useEffect(() => {
    let entriesFilted = '';
    if (entries.length > 0) {
      entriesFilted = entries.filter(entri =>
        entri.categories.includes(selectedCategory),
      );
      setEntryList(entriesFilted);
    }

    console.log(
      'filtered entry',
      entryList,
      'category',
      selectedCategory,
    );
  }, [selectedCategory]);

  return (
    <div className="entries">
      {entryList &&
        entryList.map(entry => (
          <Link key={entry.entryId} to="/">
            <div
              className="entry margin--all margin--bottom__m"
              onClick={() => setSelectedEntry(entry)}
            >
              <h5 className="margin--vert">{entry.title}</h5>
              <div>
                <h6 className="type-color--secondary milli">
                  Date Created :{' '}
                  {moment(entry.dateCreated).format('MM/DD/YY')}
                </h6>
                <h6 className="type-color--secondary milli">
                  Last Updated :{' '}
                  {moment(entry.dateUpdated).format('MM/DD/YY')}
                </h6>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ListEntries;
