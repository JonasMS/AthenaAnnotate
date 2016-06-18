import React, { PropTypes } from 'react';
import Note from './Note';

const NoteList = ({ id, notes, onNoteDelete, onNoteEdit, onSaveEdit }) => {
  const articleNotes = notes.filter(note => id === note.article_id);
  const noteList = articleNotes.map(note => (
    <Note
      key={note.id}
      {...note}
      onNoteDelete={() => onNoteDelete(note.id)}
      onNoteEdit={onNoteEdit}
      onSaveEdit={onSaveEdit}
    />
  ));
  return (
    <ul>
      {noteList}
    </ul>
  );
};

NoteList.propTypes = {
  id: PropTypes.number.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
};

export default NoteList;
