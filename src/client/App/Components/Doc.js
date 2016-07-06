import React, { PropTypes } from 'react';
import VisibleAnnotationList from '../Containers/VisibleAnnotationList';

const changeLocation = (url) => {
  window.location = url;
};

const Doc = ({ user, url, privacy, baseUrl, title, image, id, count, onDocDelete, listView, filter, updateDocPrivacy }) => (
  <li className="object doc">
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
        {filter !== 'Self'
          ?
          null
          :
          <div className="buttons">
            <button
              className="waves-effect waves-light btn-floating"
              onClick={onDocDelete}
            >
              <i className="material-icons">delete</i>
            </button>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"d
              >
                {privacy ? 'Private' : 'Public'}
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><a onClick={() => updateDocPrivacy(true, url, user.id)}>Private</a></li>
                <li><a onClick={() => updateDocPrivacy(false, url, user.id)}>Public</a></li>
              </ul>
            </div>
          </div>
        }
        <VisibleAnnotationList id={id} />
      </div>
    }
  </li>
);

Doc.propTypes = {
  user: PropTypes.object.isRequired,
  privacy: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  count: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  updateDocPrivacy: PropTypes.func.isRequired,
};

export default Doc;
