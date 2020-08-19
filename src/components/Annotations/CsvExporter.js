import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { dumpCsv } from '~/util/csv';

const CsvExporter = ({ data }) => {
  const dataUrl = `data:text/csv;base64,${btoa(
    unescape(encodeURIComponent(dumpCsv(data)))
  )}`;
  return (
    <div className="CsvExporter">
      <Button
        disabled={data.length === 0}
        color={data.length > 0 ? 'red' : null}
        as="a"
        download="annotations.csv"
        href={dataUrl}
      >
        <Icon name="download" />
        {data.length}
      </Button>
    </div>
  );
};

export default CsvExporter;
