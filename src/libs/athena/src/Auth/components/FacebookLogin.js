import React from 'react';

export class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
    this.rawMarkup = this.rawMarkup.bind(this);
    this.didClickFacebookLoginButton = this.didClickFacebookLoginButton.bind(this);
  }

  didClickFacebookLoginButton() {
    console.log('didClickFacebookLoginButton called');
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
