import React from 'react';
import { Segment } from 'semantic-ui-react';

import PdfPageLoader from '../DocumentLoader/PdfPageLoader';
import PdfViewer from './PdfViewer';

const renderFile = file => {
  const { type } = file;
  if (type === 'application/pdf') {
    return <PdfViewer file={file} />;
  }
  return <p>unsupported format: {type}</p>;
};

const DocumentViewer = ({ file }) => (
  <>
    <PdfPageLoader />
    <Segment className="DocumentViewer">{renderFile(file)}</Segment>
  </>
);

export default DocumentViewer;
