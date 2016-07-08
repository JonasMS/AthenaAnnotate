import React, { PropTypes } from 'react';

const ControlButton = ({ handler, icon }) => (
  <span>
    <button className={`${icon} control-btn control-btn-default`} onClick={handler}></button>
  </span>
);

ControlButton.propTypes = {
  label: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default ControlButton;
