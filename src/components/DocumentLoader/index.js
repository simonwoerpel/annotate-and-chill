import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { Dimmer, Loader, Header, Icon, Segment } from 'semantic-ui-react';

const DocumentLoader = () => {
  const loadDocument = useStoreActions(a => a.document.loadDocument);
  const isLoading = useStoreState(s => s.document.isLoading);
  const onDrop = useCallback(acceptedFiles => loadDocument(acceptedFiles[0]), [
    loadDocument,
  ]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="DocumentLoader" {...getRootProps()}>
      <Segment placeholder>
        {isLoading ? (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Header icon>
            <Icon name="pdf file outline" />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop a document here, or click to select a
                file. Currently only PDF is supported.
              </p>
            )}
          </Header>
        )}
      </Segment>
    </div>
  );
};

export default DocumentLoader;
