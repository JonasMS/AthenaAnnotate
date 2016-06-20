import React, { PropTypes } from 'react';
import VisibleAnnotationList from '../Containers/VisibleAnnotationList';

const changeLocation = (url) => {
  window.location = url;
};

const Doc = ({ url, id }) => (
  <li
    className="card blue-grey darken-1 white-text"
  >
    <p onClick={() => changeLocation(url)}>
      {url}
    </p>
    <VisibleAnnotationList
      id={id}
    />
  </li>
);

Doc.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Doc;
