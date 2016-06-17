import React, { Proptypes } from 'react';
import Note from './Note';

const NoteList = ({ onNoteDelete, notes, onNoteEdit }) => (
  <ul>
		{notes.map(note => (
      <Note
        key={note.id}
        {...note}
        onNoteDelete={() => onNoteDelete(note.id)}
        onNoteEdit={onNoteEdit}
			/>
    ))}
  </ul>
);

export default NoteList;
