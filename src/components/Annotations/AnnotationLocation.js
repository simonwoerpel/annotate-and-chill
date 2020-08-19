import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { formatRgba, getRandomColor } from '~/util';

const AnnotationLocation = ({ annotation, hilighted }) => {
  const { email, color, otherUsers } = useStoreState(s => s.user);
  const { hilight } = useStoreActions(s => s.ui.annotations);
  const userColor =
    email === annotation.email
      ? color
      : otherUsers[annotation.email]?.color || getRandomColor();
  const [x1, y1, x2, y2] = annotation.reference.location;
  const style = {
    display: 'block',
    position: 'absolute',
    border: hilighted ? `2px solid ${formatRgba(userColor)}` : null,
    background: formatRgba({ ...userColor, a: 0.1 }),
    top: `${y1}%`,
    left: `${x1}%`,
    width: `${x2 - x1}%`,
    height: `${y2 - y1}%`,
  };
  return (
    <div
      className="AnnotationLocation"
      style={style}
      onMouseOver={() => hilight(annotation.id)}
      onMouseOut={() => hilight(null)}
    />
  );
};

export default AnnotationLocation;
