import React, { PropTypes } from 'react';
import AnnotationEditor from '../Containers/AnnotationEditor';

const Annotation = (
  {
    onAnnotationDelete,
    onAnnotationEdit,
    onSaveEdit,
    body,
    edit,
    id,
    target,
  }
) => (
  <li
    className="card grey darken-1 white-text"
  >
    {target}
    <p>
      {body}
    </p>
    <div
      className="card-action"
    >
      {edit ?
        <AnnotationEditor
          body={body}
          onCancel={() => onAnnotationEdit(id)}
          onSave={(txt) => onSaveEdit(id, txt)}
        />
        : null}
      <button
        className="waves-effect waves-light btn-floating"
        onClick={() => onAnnotationEdit(id)}
      >
        <i className="material-icons">mode_edit</i>
      </button>
      <button
        className="waves-effect waves-light btn-floating"
        onClick={onAnnotationDelete}
      >
        <i className="material-icons">delete</i>
      </button>
    </div>
  </li>
);

Annotation.propTypes = {
  onAnnotationDelete: PropTypes.func.isRequired,
  onAnnotationEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  target: PropTypes.string.isRequired,
};

export default Annotation;
