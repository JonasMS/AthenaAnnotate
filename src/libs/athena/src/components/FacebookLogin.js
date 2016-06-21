import React from 'react';

class FacebookLogin extends React.Component {
  render() {
    return (
      <button ref="loginButton" onClick={this.props.login}>
         Log Into Facebook
      </button>
    );
  }
}

FacebookLogin.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default FacebookLogin;
