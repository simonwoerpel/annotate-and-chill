import React from 'react';
import classNames from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Icon, Comment } from 'semantic-ui-react';
import { formatRgba, getRandomColor } from '~/util';

import './Annotation.scss';

const Annotation = ({ data }) => {
  const { deleteAnnotation } = useStoreActions(s => s.annotations);
  const { hilight } = useStoreActions(s => s.ui.annotations);
  const { hilighted } = useStoreState(s => s.ui.annotations);
  const { email, color, otherUsers } = useStoreState(s => s.user);
  const itsMe = email === data.email;
  const user = itsMe ? 'Me' : `${data.firstName} ${data.lastName}`;
  const userColor = formatRgba(
    itsMe ? color : otherUsers[data.email]?.color || getRandomColor()
  );
  const date = new Date(data.date);
  const className = classNames('Annotation', {
    'Annotation--hilighted': hilighted === data.id,
  });

  return (
    <Comment
      className={className}
      onMouseOver={() => hilight(data.id)}
      onMouseOut={() => hilight(null)}
    >
      <Comment.Content>
        <Comment.Author style={{ color: userColor }}>{user}</Comment.Author>
        <Comment.Metadata>
          {date.toDateString()} {date.toLocaleTimeString()}
        </Comment.Metadata>
        <Comment.Text>{data.body}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={() => deleteAnnotation(data)}>
            <Icon name="trash" />
            Delete
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default Annotation;
