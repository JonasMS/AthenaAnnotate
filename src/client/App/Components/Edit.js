import React, { PropTypes } from 'react';

let textarea = '';

const handleText = (event) => {
  textarea = event.target.value;
  // window.console.log(textarea);
};

const Edit = ({ note, onCancel, id, editText }) => (
  <div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editText(id, textarea);
      }}
    >
      <textarea
        className="materialize-textarea"
        defaultValue={note}
        onChange={handleText}
        // onClick={onClick}
      />
      <button
        className="waes-effect waves-light btn"
        type="submit"
      >
        Save
      </button>
      <button
        className="waes-effect waves-light btn"
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

Edit.propTypes = {
  note: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  editText: PropTypes.func.isRequired,
};

export default Edit;
