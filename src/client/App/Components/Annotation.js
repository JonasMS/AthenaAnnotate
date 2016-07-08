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
    userTitle,
    filter,
    userId,
    // followUser,
    user,
    // following,
    // setFilter,
    setUserDB,
    userImage,
  }
) => (
  <li className="object annotation">
    {filter !== 'Self' && filter !== 'User' ?
      <div>
        <div
          className="circle userPic-small"
          style={{ backgroundImage: `url(${userImage})` }}
          alt={userName}
        />
        <div className="userInfo">
          <a
            className="username"
            onClick={() => {
              setUserDB(userId);
            }}
          >
            <div>{userName}</div>
          </a>
          <div className="userTitle">{userTitle}</div>
        </div>
      </div>
      : null}
    <blockquote>
      {target}
    </blockquote>
    <div>
    {!!body ?
      <div>
        {!edit ? body : null}
        <div
          className="card-action"
        >
          {edit && (user.id === userId) ?
            <BodyEditor
              body={body}
              onCancel={() => onEditBody(id)}
              onSave={(txt, privacy, grp) => onSaveEdit(id, txt, privacy, grp, url)}
              onDelete={() => onDeleteBody(id, url)}
            />
            : null}
          {!edit && (user.id === userId) ?
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
    <div className="buttons">
      {user.id !== userId ? null :
        <button
          className="waves-effect waves-light btn-floating"
          onClick={onAnnotationDelete}
        >
          <i className="material-icons">delete</i>
        </button>}
    </div>
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
  userTitle: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  setUserDB: PropTypes.func.isRequired,
  userImage: PropTypes.string.isRequired,
};

export default Annotation;

// {user.id === userId ? null :
//   <a className="follow" onClick={() => followUser(userId, user.id)}>
//     {following.users.filter(followedUser => followedUser.id === userId).length !== 0
//     ? 'unfollow' : 'follow'}
//   </a>
// }
