import React from 'react';
import FacebookLogin from './FacebookLogin';

const AuthPanel = ({ login }) => (
  <div>
    <h1> AuthPanel </h1>
    <div>
      <FacebookLogin login={login} />
    </div>
  </div>
);

AuthPanel.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default AuthPanel;
