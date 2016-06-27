import React from 'react';
import { Button } from 'react-bootstrap';
import FacebookLogin from './FacebookLogin';

const AuthPanel = ({ login, close }) => (
  <div>
    <Button onClick={close}> Close </Button>
    <h1> Auth Panel </h1>
    <div>
      <FacebookLogin login={login} />
    </div>
  </div>
);

AuthPanel.propTypes = {
  login: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
};

export default AuthPanel;
