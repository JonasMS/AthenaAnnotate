import React, { PropTypes } from 'react';

const Editor = ({ body, onCancel, editText, onSave, editor }) => (
  <div>
    <form>
      <textarea
        className="materialize-textarea"
        defaultValue={body}
        onChange={(e) => editText(e.target.value)}
      />
      <button
        className="waes-effect waves-light btn"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSave(editor);
        }}
      >
        Save
      </button>
      <button
        className="waes-effect waves-light btn"
        onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}
      >
        Cancel
      </button>
    </form>
  </div>
);

Editor.propTypes = {
  body: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
};

export default Editor;
