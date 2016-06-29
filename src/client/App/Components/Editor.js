import React, { PropTypes } from 'react';

const Editor = ({ body, onCancel, editText, onSave, editor, onDelete }) => (
  <div>
    <form>
      <textarea
        className="form-control"
        defaultValue={body}
        onChange={(e) => editText(e.target.value)}
      />
      <button
        className="btn btn-default"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSave(editor);
        }}
      >
        Save
      </button>
      <button
        className="btn btn-default"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        Delete
      </button>
      <button
        className="btn btn-default"
        onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}
      >
        Cancel
      </button>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"d
        >
          Privacy
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#">Private</a></li>
          <li><a href="#">Public</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Groups</a></li>
        </ul>
      </div>
    </form>
  </div>
);

Editor.propTypes = {
  body: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
};

export default Editor;
