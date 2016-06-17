import React from 'react';
import NoteList from './NoteList';

const changeLocation = (url) => {
  window.location = url;
};

const Article = ({ onNoteDelete, url, notes, onNoteEdit,editText }) => (
  <li
    // onClick={onClick}
  >
    <p onClick={() => changeLocation(url)}>
      {url}
    </p>
    <NoteList
      notes={notes}
      onNoteDelete={onNoteDelete}
      onNoteEdit={onNoteEdit}
      editText={editText}
    />
  </li>
);

export default Article;
