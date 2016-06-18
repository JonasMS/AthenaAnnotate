import React, { PropTypes } from 'react';
import NoteList from './NoteList';

const changeLocation = (url) => {
  window.location = url;
};

const Article = ({ onNoteDelete, url, notes, onNoteEdit, editText }) => (
  <li
    className="card blue-grey darken-1 white-text"
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

Article.propTypes = {
  onNoteDelete: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
};

export default Article;
