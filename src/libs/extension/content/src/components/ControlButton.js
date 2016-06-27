import React, { PropTypes } from 'react';

const ControlButton = ({ handler, label }) => (
  <span>
    <button onClick={handler}> {label} </button>
  </span>
);

ControlButton.propTypes = {
  label: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default ControlButton;
