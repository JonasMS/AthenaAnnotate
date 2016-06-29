import React, { PropTypes } from 'react';

const Modal = ({ group }) => (
  <div>
    <p>Create a new group</p>
    <input type="text" placeholder="Group Name" />
    <button className="btn btn-default">Create</button>
    <button className="btn btn-default">Cancel</button>
  </div>
);

Modal.propTypes = {
  profile: PropTypes.bool.isRequired,
};

export default Modal;
