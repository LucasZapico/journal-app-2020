import React, { createContext, useContext, useState } from 'react';
import Preview from '../components/Preview';

export const PreviewerContext = createContext();
export const PreviewerProvider = ({ children }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMarkup, setShowMarkup] = useState(false);

  return (
    <PreviewerContext.Provider
      value={{
        showPreview,
        setShowPreview,
        showMarkup,
        setShowMarkup,
      }}
    >
      {children}
    </PreviewerContext.Provider>
  );
};

export const usePreviewerValue = () => useContext(PreviewerContext);
