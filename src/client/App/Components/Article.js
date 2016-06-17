import React from 'react';
import NoteList from './NoteList';

const changeLocation = (url) => {
  window.location = url;
};

const Article = ({ onClick, url, notes }) => (
  <li
    // onClick={onClick}
  >
    <p onClick={() => changeLocation(url)}>
      {url}
    </p>
    <NoteList
      notes={notes}
      onClick={onClick}
    />
  </li>
);

export default Article;
