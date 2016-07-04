import React, { PropTypes } from 'react';
import VisibleAnnotationList from '../Containers/VisibleAnnotationList';

const changeLocation = (url) => {
  window.location = url;
};

const Doc = ({ url, baseUrl, title, image, id, count, onDocDelete, listView, filter }) => (
  <li>
    {listView
      ?
      <div className="media card" onClick={() => changeLocation(url)}>
        <a>
          <div className="media-left">
            <img className="media-object docimage small" src={image} alt="Thumbnail" />
          </div>
          <div className="media-body">
            <h4 className="media-heading">{title}</h4>
            <p className="url">{baseUrl}</p>
            <span className="note-count">Annotations: {count}</span>
          </div>
        </a>
      </div>
      :
      <div className="card">
        <a onClick={() => changeLocation(url)}>
          <div className="image">
            <img className="docimage large" src={image} alt="Document" />
          </div>
          <h4 className="heading">{title}</h4>
          <p className="url">{baseUrl}</p>
        </a>
        {filter !== 'Self' ? null :
          <button
            className="waves-effect waves-light btn-floating"
            onClick={onDocDelete}
          >
            <i className="material-icons">delete</i>
          </button>}
        <VisibleAnnotationList id={id} />
      </div>
    }
  </li>
);

Doc.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Doc;
