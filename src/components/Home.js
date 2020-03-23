import React from 'react';
import Editor from './Editor';
import Preview from './Preview';
import { usePreviewerValue, useSelectedEntryValue } from '../context';

const Home = () => {
  const { showPreview } = usePreviewerValue();
  const { selectedEntry } = useSelectedEntryValue();

  return (
    <div>
      {!selectedEntry ? (
        <div className="flex-container flex--justify__center flex--align__center">
          <div className="card">
            <h4>
              Write something amazing, simple, clear, informative!
            </h4>
          </div>
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
