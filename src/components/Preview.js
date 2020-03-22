import React, { useState, useEffect } from 'react';
import { useSelectedEntryValue } from '../context';
import ToMarkdown from './ToMarkdown';

const Preview = () => {
  const { selectedEntry, setSelectedEntry } = useSelectedEntryValue();
  const [preview, setPreview] = useState('Loading');
  useEffect(() => {
    if (selectedEntry && selectedEntry.entryBody) {
      setPreview(selectedEntry);
    }
  }, [selectedEntry]);

  return (
    <div id="preview">
      {preview !== 'Loading' ? (
        <ToMarkdown text={preview.entryBody} />
      ) : (
        <div className="loading">
          <div className="p"></div>
          <div className="p"></div>
          <div className="p"></div>
          <div className="p"></div>
        </div>
      )}
    </div>
  );
};

export default Preview;
