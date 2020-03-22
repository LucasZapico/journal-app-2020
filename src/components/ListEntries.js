import React, { useState } from 'react';
import { useEntriesValue, useSelectedEntryValue } from '../context';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ListEntries = () => {
  const { setSelectedEntry } = useSelectedEntryValue();
  const { entries } = useEntriesValue();
  return (
    <div className="entries">
      {entries.map(entry => (
        <Link to="/">
          <div
            key={entry.entryId}
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
