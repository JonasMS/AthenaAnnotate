import React from 'react';
import { Button } from 'react-bootstrap';

const FacebookLogin = ({ login }) => (
  <Button bsStyle="primary" onClick={login}>
    Log Into Facebook
  </Button>
);

FacebookLogin.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default FacebookLogin;
