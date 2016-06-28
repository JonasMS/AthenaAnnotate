import React, { PropTypes } from 'react';

const Privacy = (/*{ body, onCancel, editText, onSave, editor, onDelete }*/) => (
  <select>
    <option value="Private">Private</option>
    <option value="Public">Public</option>
    <option value="Group">Group</option>
  </select>
    
);

Privacy.propTypes = {
  // body: PropTypes.string.isRequired,
  // onCancel: PropTypes.func.isRequired,
  // onSave: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  // editText: PropTypes.func.isRequired,
  // editor: PropTypes.string.isRequired,
};

export default Privacy;
