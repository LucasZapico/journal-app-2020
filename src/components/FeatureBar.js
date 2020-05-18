import React from 'react';
import { FaFileCode, FaFileImage } from 'react-icons/fa';
import { usePreviewerValue } from '../context';

const FeatureBar = () => {
  const { showPreview, setShowPreview } = usePreviewerValue();
  return (
    <div class="feature-bar">
      <div onClick={() => setShowPreview(!showPreview)}>
        <FaFileImage />
      </div>
      {/* <div>
        <FaFileCode />
      </div> */}
    </div>
  );
};

export default FeatureBar;
