import React from 'react';

const FacebookLogout = ({ logout }) => (
  <button onClick={logout}>
    Log Out of Facebook
  </button>
);

FacebookLogout.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

export default FacebookLogout;
