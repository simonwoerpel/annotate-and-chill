import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import * as UI from 'semantic-ui-react';

export function Loader() {
  return (
    <UI.Dimmer active inverted>
      <UI.Loader inverted>Loading</UI.Loader>
    </UI.Dimmer>
  );
}

export function Dropzone({ isLoading, onDrop }) {
  const onDropCallback = useCallback(files => onDrop(files[0]), [onDrop]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropCallback,
  });
  return (
    <div {...getRootProps()}>
      <UI.Segment placeholder>
        {isLoading ? (
          <UI.Segment>
            <UI.Dimmer active inverted>
              <UI.Loader inverted>Loading</UI.Loader>
            </UI.Dimmer>
          </UI.Segment>
        ) : (
          <UI.Header icon>
            <UI.Icon name="pdf file outline" />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            )}
          </UI.Header>
        )}
      </UI.Segment>
    </div>
  );
}
