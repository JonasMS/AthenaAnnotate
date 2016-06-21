import React, { PropTypes } from 'react';
import VisibleAnnotationList from '../Containers/VisibleAnnotationList';

const changeLocation = (url) => {
  window.location = url;
};

const Doc = ({ url, id, onDocDelete, listView }) => (
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
    {listView}
    {listView ? null : <VisibleAnnotationList id={id} />}
  </li>
);

Doc.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
};

export default Doc;
