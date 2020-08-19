import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Header, Button, Icon, Progress, Modal } from 'semantic-ui-react';

const PdfPageLoader = () => {
  const { pagesNum, renderedPages, renderPagesComplete, data } = useStoreState(
    s => s.document
  );
  const { clear } = useStoreActions(s => s.document);

  return (
    <Modal
      basic
      open={data.file && !renderPagesComplete}
      size="small"
      dimmer="blurring"
    >
      <Header icon>
        <Icon name="paint brush" loading />
        {`Rendering ${pagesNum} pages`}
      </Header>
      <Modal.Content>
        <Progress
          value={renderedPages}
          total={pagesNum}
          progress="ratio"
          indicating
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => clear()}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PdfPageLoader;
