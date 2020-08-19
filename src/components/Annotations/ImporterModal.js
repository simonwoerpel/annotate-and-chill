import React from 'react';
import { Modal } from 'semantic-ui-react';

const ImporterModal = ({ children, open, setOpen }) => (
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    dimmer="blurring"
  >
    <Modal.Header>Import annotations from csv</Modal.Header>
    <Modal.Content>{children}</Modal.Content>
  </Modal>
);

export default ImporterModal;
