import React from 'react';
import Editor from './Editor';
import Preview from './Preview';
import { usePreviewerValue, useSelectedEntryValue } from '../context';
import FeatureBar from './FeatureBar';
import CodePreview from './CodePreview';

const Home = () => {
  const { showPreview } = usePreviewerValue();
  const { selectedEntry } = useSelectedEntryValue();

  return (
    <div className="editor-wrapper">
      <FeatureBar />
      {selectedEntry.dateCreated == undefined ? (
        <div className="flex-container flex--justify__center flex--align__center">
          <div className="card">
            <h4>
              Write something amazing, simple, clear, informative!
            </h4>
          </div>
        </div>
      ) : (
        <div
          className={showPreview ? 'show-preview content' : 'content'}
        >
          <Editor />
          <Preview />
          {/* <CodePreview /> */}
        </div>
      )}
    </div>
  );
};

export default Home;
