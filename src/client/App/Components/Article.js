import React, { PropTypes } from 'react';
import VisibleNoteList from '../Containers/VisibleNoteList';

const changeLocation = (url) => {
  window.location = url;
};

const Article = ({ url, id }) => (
  <li
    className="card blue-grey darken-1 white-text"
  >
    <p onClick={() => changeLocation(url)}>
      {url}
    </p>
    <VisibleNoteList
      id={id}
    />
  </li>
);

Article.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Article;
