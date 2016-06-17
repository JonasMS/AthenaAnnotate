import React, { PropTypes } from 'react';

const Note = ({ onClick, text }) => (
  <li
    onClick={onClick}
  >
    {text}
  </li>
);


export default Note;