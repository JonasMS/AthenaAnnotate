import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const ControlButton = ({ handler, label }) => (
  <span>
    <Button onClick={handler}> {label} </Button>
  </span>
);

ControlButton.propTypes = {
  label: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default ControlButton;
