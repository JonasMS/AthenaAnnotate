import React, { PropTypes } from 'react';
import Edit from './Edit';

const Note = ({ onNoteDelete, onNoteEdit, note, edit, id, editText, text }) => (
  <li
    className="card grey darken-1 white-text"
    // onClick={onClick}
  >
    {text}
    <p>
      {note}
    </p>
    <div
      className="card-action"
    >
      {edit ?
        <Edit note={note} onCancel={onNoteEdit} id={id} editText={editText} />
        : null}
      <button
        className="waves-effect waves-light btn-floating"
        onClick={() => onNoteEdit(id)}
      >
        <i className="material-icons">mode_edit</i>
      </button>
      <button
        className="waves-effect waves-light btn-floating"
        onClick={onNoteDelete}
      >
        <i className="material-icons">delete</i>
      </button>
    </div>
  </li>
);

Note.propTypes = {
  onNoteDelete: PropTypes.func.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  editText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Note;
