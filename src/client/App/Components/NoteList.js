import React, { Proptypes } from 'react';
import Note from './Note';

const NoteList = ({ onClick, notes }) => (
  <ul>
		{notes.map(note => (
      <Note
        key={note.id}
        {...note}
        onClick={() => onClick(note.id)}
			/>
    ))}
  </ul>
);

export default NoteList;
