import React from 'react';
import { Button } from 'react-bootstrap';
import FacebookLogin from './FacebookLogin';

const AuthPanel = ({ login }) => (
  <div className="athena">
    <div className="heading">
      <div className="title">Athena</div>
    </div>
    <div>
      <FacebookLogin className="submitBtn" login={login} />
    </div>
  </div>
);

AuthPanel.propTypes = {
  login: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
};

export default AuthPanel;
