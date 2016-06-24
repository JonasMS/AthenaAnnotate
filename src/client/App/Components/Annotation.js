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
    user,
    filter,
  }
) => (
  <li
    className="card grey darken-1 white-text"
  >
    {target}
    <div>
    {!!body ?
      <div>
        <p>
          {!edit ? body : null}
        </p>
        <div
          className="card-action"
        >
          {filter !== 'Self' ?
            <div>{user}</div> : null}
          {edit && filter === 'Self' ?
            <BodyEditor
              body={body}
              onCancel={() => onEditBody(id)}
              onSave={(txt) => onSaveEdit(id, txt, url)}
              onDelete={() => onDeleteBody(id, url)}
            />
            : null}
          {!edit && filter === 'Self' ?
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
    <button
      className="waves-effect waves-light btn-floating"
      onClick={onAnnotationDelete}
    >
      <i className="material-icons">delete</i>
    </button>
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
  user: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Annotation;
