import React, { PropTypes } from 'react';
import NoteEditor from '../Containers/NoteEditor';

const Note = ({ onNoteDelete, onNoteEdit, onSaveEdit, note, edit, id, text }) => (
  <li
    className="card grey darken-1 white-text"
  >
    {text}
    <p>
      {note}
    </p>
    <div
      className="card-action"
    >
      {edit ?
        <NoteEditor
          noteText={note}
          onCancel={() => onNoteEdit(id)}
          onSave={(txt) => onSaveEdit(id, txt)}
        />
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
  onSaveEdit: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Note;
