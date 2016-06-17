import React, { PropTypes } from 'react';

const Edit = ({ text, edit, onCancel, id }) => (
  <div>
  <textarea
    defaultValue={text}
    // onClick={onClick}
  />
  <div>
    <button>
      Save
    </button>
    <button
      onClick={() => onCancel(id)}>
      Cancel
    </button>
  </div>
  </div>
);

export default Edit;