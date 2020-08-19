import React from 'react';
import { Comment, Segment } from 'semantic-ui-react';

import Annotation from './Annotation';

const Annotations = ({ annotations }) => {
  const showAnnotations = annotations?.length > 0;

  return (
    showAnnotations && (
      <Segment className="Annotations">
        <Comment.Group>
          {annotations.map(a => (
            <Annotation key={a.id} data={a} />
          ))}
        </Comment.Group>
      </Segment>
    )
  );
};

export default Annotations;
