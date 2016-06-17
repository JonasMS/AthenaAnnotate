import React, { Proptypes } from 'react';
import Note from './Note';

const NoteList = ({ onNoteDelete, notes, onNoteEdit, editText }) => (
  <ul>
		{notes.map(note => (
      <Note
        key={note.id}
        {...note}
        onNoteDelete={() => onNoteDelete(note.id)}
        onNoteEdit={onNoteEdit}
        editText={editText}
			/>
    ))}
  </ul>
);

export default NoteList;
