import React, { PropTypes } from 'react';
import BodyEditor from '../Containers/BodyEditor';

const Annotation = (
  {
    onAnnotationDelete,
    onEditBody,
    onSaveEdit,
    onDeleteBody,
    body,
    edit,
    id,
    url,
    target,
    userName,
    filter,
    userId,
    followUser,
    user,
    following,
  }
) => (
  <li
    className="list-group-item"
  >
    {target}
    <div>
    {!!body ?
      <div>
        <div className="well">
          {!edit ? body : null}
        </div>
        <div
          className="card-action"
        >
          {filter !== 'Self' ?
            <div>
              {userName}
              {user.id === userId ? null :
                <a onClick={() => followUser(userId, user.id)}>{following[userId] === 1
                  ? 'unfollow' : 'follow'}</a>
              }
            </div>
            : null}
          {edit && (/* filter === 'Self' || */user.id === userId) ?
            <BodyEditor
              body={body}
              onCancel={() => onEditBody(id)}
              onSave={(txt) => onSaveEdit(id, txt, url)}
              onDelete={() => onDeleteBody(id, url)}
            />
            : null}
          {!edit && (/* filter === 'Self' || */user.id === userId) ?
            <button
              className="waves-effect waves-light btn-floating"
              onClick={() => onEditBody(id)}
            >
              <i className="material-icons">mode_edit</i>
            </button>
            : null}
        </div>
      </div>
    : null}
    </div>
    {/* filter !== 'Self' || */user.id !== userId ? null :
      <button
        className="waves-effect waves-light btn-floating"
        onClick={onAnnotationDelete}
      >
        <i className="material-icons">delete</i>
      </button>}
  </li>
);

Annotation.propTypes = {
  onAnnotationDelete: PropTypes.func.isRequired,
  onEditBody: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onDeleteBody: PropTypes.func.isRequired,
  body: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
};

export default Annotation;
