import React from 'react';
import Editor from './Editor';
import Preview from './Preview';
import { usePreviewerValue, useSelectedEntryValue } from '../context';

const Home = () => {
  const { showPreview } = usePreviewerValue();
  const { selectedEntry } = useSelectedEntryValue();
  console.log('home', selectedEntry);
  return (
    <div>
      {selectedEntry.title === '' ? (
        <div className="filler">
          <h4>
            Write something amazing, simple, clear, informative!
          </h4>
        </div>
      ) : (
        <div
          id="content"
          className={showPreview ? 'show-preview' : ''}
        >
          <Editor />
          <Preview />
        </div>
      )}
    </div>
  );
};

export default Home;
