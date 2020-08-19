import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, Form, Segment, TextArea } from 'semantic-ui-react';

import './AnnotationForm.scss';

const AnnotationForm = () => {
  const { createAnnotation } = useStoreActions(s => s.annotations);
  const { annotationForm, draw } = useStoreActions(s => s.ui);
  const [top, left] = useStoreState(s => s.ui.annotationForm.position);
  const { reference } = useStoreState(s => s.reference); // FIXME
  const [value, setValue] = useState('');
  const onSubmit = () =>
    createAnnotation({ body: value, reference }) && setValue('');
  const style = {
    position: 'absolute',
    zIndex: 1000,
    top,
    left,
  };

  return (
    <Segment className="AnnotationForm" raised style={style}>
      <Button
        className="AnnotationForm__close-button"
        circular
        size="mini"
        icon="close"
        color="red"
        onClick={() => annotationForm.toggle(false) && draw.clearCanvas()}
      />
      <Form className="AnnotationForm__form">
        <TextArea
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button fluid primary onClick={onSubmit}>
          Save
        </Button>
      </Form>
    </Segment>
  );
};

export default AnnotationForm;
