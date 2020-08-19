import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStoreActions, useStoreState } from 'easy-peasy';

import {
  Checkbox,
  Dimmer,
  Loader,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

const CsvImporter = () => {
  const [replace, toggleReplace] = useState(false);
  const replaceRef = useRef(replace);
  const importCsv = useStoreActions(s => s.annotations.importCsv);
  const isLoading = useStoreState(s => s.annotations.isLoadingCsv);
  const onDrop = useCallback(
    acceptedFiles =>
      importCsv({ file: acceptedFiles[0], replace: replaceRef.current }),
    [importCsv]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="CsvImporter">
      <div className="CsvImporter__dropzone" {...getRootProps()}>
        <Segment placeholder>
          {isLoading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Header icon>
              <Icon name="file outline" />
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>
                  Drag &apos;n&apos; drop a csv file here, or click to select a file
                </p>
              )}
            </Header>
          )}
        </Segment>
      </div>
      <Checkbox
        label="Replace existing annotations (instead of merging)"
        checked={replace}
        onChange={() => toggleReplace(!replace)}
      />
    </div>
  );
};

export default CsvImporter;
