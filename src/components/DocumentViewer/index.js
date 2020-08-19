import React from 'react';
import { Icon, Message, Segment } from 'semantic-ui-react';

import PdfViewer from './PdfViewer';

const renderFile = file => {
  const { type } = file;
  if (type === 'application/pdf') {
    return <PdfViewer file={file} />;
  }
  return (
    <Message negative icon>
      <Icon name="warning" />
      <Message.Content>
        <Message.Header>Unsupported file format: {type}</Message.Header>
        <p>Sorry, currently only PDF is supported.</p>
      </Message.Content>
    </Message>
  );
};

const DocumentViewer = ({ file }) => (
  <Segment className="DocumentViewer">{renderFile(file)}</Segment>
);

export default DocumentViewer;
