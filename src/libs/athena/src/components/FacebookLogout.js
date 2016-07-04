import React from 'react';
import { Button } from 'react-bootstrap';

const FacebookLogout = ({ logout }) => (
  <Button bsStyle="warning" onClick={logout}>
    Log Out Facebook
  </Button>
);

FacebookLogout.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

export default FacebookLogout;
