import React, { PropTypes } from 'react';
import VisibleAnnotationList from '../Containers/VisibleAnnotationList';

const changeLocation = (url) => {
  window.location = url;
};

const Doc = ({ url, id, onDocDelete }) => (
  <li
    className="card blue-grey darken-1 white-text"
  >
    <div onClick={() => changeLocation(url)}>
      {url}
    </div>
    <button
      className="waves-effect waves-light btn-floating"
      onClick={onDocDelete}
    >
      <i className="material-icons">delete</i>
    </button>
    <VisibleAnnotationList
      id={id}
    />
  </li>
);

Doc.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDocDelete: PropTypes.func.isRequired,
};

export default Doc;
