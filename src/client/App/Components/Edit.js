import React, { PropTypes } from 'react';

let textarea = '';

const handleText = (event) => {
  textarea = event.target.value;
  window.console.log(textarea);
}

const Edit = ({ text, edit, onCancel, id, editText }) => (
  <div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editText(id, textarea);
      }}
    >
      <textarea
        defaultValue={text}
        onChange={handleText}
        // onClick={onClick}
      />
      <button type="submit">
        Save
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onCancel(id);
        }}
      >
        Cancel
      </button>
    </form>
  </div>
);

export default Edit;
