import React, { PropTypes } from 'react';

const Editor = ({ noteText, onCancel, editText, onSave, editor }) => (
  <div>
    <form>
      <textarea
        className="materialize-textarea"
        defaultValue={noteText}
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
  noteText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
};

export default Editor;
