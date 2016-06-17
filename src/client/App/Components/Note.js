import React, { PropTypes } from 'react';
import Edit from './Edit';

const Note = ({ onNoteDelete, onNoteEdit, text, edit, id, editText }) => (
  <li
    // onClick={onClick}
  >
    {text}
    <div>
      {edit ? <Edit text={text} edit={edit} onCancel={onNoteEdit} id={id} editText={editText}/> : null}
      <button
        onClick={() => onNoteEdit(id)}
      >
        Edit Note
      </button>
      <button onClick={onNoteDelete}>
        Delete Note
      </button>
    </div>
  </li>
);

export default Note;