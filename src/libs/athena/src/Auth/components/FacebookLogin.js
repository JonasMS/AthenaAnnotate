import React from 'react';

export class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
    this.didClickFacebookLoginButton = this.didClickFacebookLoginButton.bind(this);
  }

  didClickFacebookLoginButton() {
    this.props.login();
  }

  render() {
    return (
      <div>
        <button ref="loginButton" onClick={this.didClickFacebookLoginButton}>
           Log Into Facebook
        </button>
      </div>
    );
  }
}

FacebookLogin.propTypes = {
  login: React.PropTypes.func.isRequired,
};
