import React from 'react';

const FacebookLogin = ({ login }) => (
  <button onClick={login}>
     Log Into Facebook
  </button>
);

FacebookLogin.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default FacebookLogin;
