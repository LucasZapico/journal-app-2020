import React, { useState, useEffect } from 'react';
import { useSelectedEntryValue } from '../context';
import Marked from 'marked';

const CodePreview = () => {
  const { selectedEntry, setSelectedEntry } = useSelectedEntryValue();
  const [codePreview, setCodePreview] = useState('Loading');
  useEffect(() => {
    if (selectedEntry && selectedEntry.entryBody) {
      let code = Marked(selectedEntry.entryBody);
      console.log('code', code);
      setCodePreview(code);
    }
  }, [selectedEntry]);

  return (
    <div className="code-preview">
      {codePreview !== 'Loading' ? (
        <pre>
          <code>{codePreview}</code>
        </pre>
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

export default CodePreview;
