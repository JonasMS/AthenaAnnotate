import React, { PropTypes } from 'react';
import Note from './Note';

const NoteList = ({ onNoteDelete, notes, onNoteEdit, editText }) => {
  const noteList = notes.map(note => (
    <Note
      key={note.id}
      {...note}
      onNoteDelete={() => onNoteDelete(note.id)}
      onNoteEdit={onNoteEdit}
      editText={editText}
    />
  ));
  return (
    <ul>
      {noteList}
    </ul>
  );
};

NoteList.propTypes = {
  onNoteDelete: PropTypes.func.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  editText: PropTypes.func.isRequired,
};

export default NoteList;
