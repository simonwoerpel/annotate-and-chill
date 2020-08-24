import React, { useState } from 'react';
import {
  Modal,
  Button,
  Icon,
  Image,
  Step,
  Header,
  Segment,
} from 'semantic-ui-react';

import logoSrc from '~/img/logo_name.png';
import loadImg from '~/img/doc/load.png';
import annotateImg from '~/img/doc/annotate.png';
import exportImg from '~/img/doc/export.png';
import importImg from '~/img/doc/import.png';

const renderStep = ({ icon, title, content, image, activeStep, setStep }) => (
  <Step
    active={icon === activeStep.icon}
    onClick={() => setStep({ icon, title, content, image })}
    key={icon}
  >
    <Icon name={icon} />
    <Step.Content>
      <Step.Title>{title}</Step.Title>
    </Step.Content>
  </Step>
);

const steps = [
  {
    icon: 'file pdf outline',
    title: 'Load document',
    content:
      'Open a document from your computer that you want to work on. Currently only PDF is supported. This document will never uploaded somewhere, it is only stored on your machine.',
    image: loadImg,
  },
  {
    icon: 'comment alternate outline',
    title: 'Annotate',
    content:
      'Use your mouse to drag areas on the document pages around the content you want to annotate. If you already used this document in the same browser, stored annotations will show up.',
    image: annotateImg,
  },
  {
    icon: 'download',
    title: 'Export & share',
    content:
      'You can always download the current annotations in CSV format and share it with your colleagues so that they can add their own annotations.',
    image: exportImg,
  },
  {
    icon: 'upload',
    title: 'Import annotations',
    content:
      'Click on the icon to import annotations in csv format from your colleagues to add them to your annotations. The csv must be in the same format as the exported one looks like.',
    image: importImg,
  },
];

const Documentation = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setStep] = useState(steps[0]);

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button icon labelPosition="right">
          <Image src={logoSrc} size="small" />
          <Icon name="info circle" />
        </Button>
      }
      dimmer="blurring"
    >
      <Header icon="help" content="About" />
      <Modal.Content>
        <Segment size="large">
          Annotate &amp; chill is a simple tool to annotate documents
          collaboratively but decentralized. You can store and share your
          annotations in a secure way and decoupled from the source document.
          Just like <a href="https://srt-subtitles.com/">.srt-files</a> for
          documents.
        </Segment>

        <Step.Group attached="top" widths={4}>
          {steps.map(step => renderStep({ ...step, activeStep, setStep }))}
        </Step.Group>
        <Segment attached>
          {activeStep.content}
          <Image src={activeStep.image} fluid />
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> got it!
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Documentation;
