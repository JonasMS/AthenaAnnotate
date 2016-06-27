import React from 'react';
import FacebookLogin from './FacebookLogin';

const AuthPanel = ({ login, close }) => (
  <div>
    <button onClick={close}> Close </button>
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
