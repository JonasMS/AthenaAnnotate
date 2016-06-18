/* global FB */

import React from 'react';
import * as Facebook from './components';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facebookPicData: {},
      facebookAuthData: {},
      accessToken: null,
      loggedIn: false,
      userId: null,
    };

    this.initFacebook = this.initFacebook.bind(this);
    this.getLoginStatus = this.getLoginStatus.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.initFacebook();
  }

  getLoginStatus() {
    window.FB.getLoginStatus((response) => {
      this.setState({ facebookAuthData: response });
    });
  }

  initFacebook() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.6',
      });

      this.getLoginStatus();
    };

    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  login() {
    window.FB.login((response) => {
      if (response.status === 'connected') {
        this.setState({
          facebookAuthData: response,
          loggedIn: true,
          userId: response.authResponse.userID,
        });
      }
    });
  }

  logout() {
    window.FB.logout((response) => {
      this.setState({
        facebookAuthData: response,
        loggedIn: false,
        userId: null,
      });
    });
  }

  render() {
    return (
      <div>
        <p> Please Login </p>
        {!this.state.loggedIn ? <Facebook.Login login={this.login} /> : null}
        {this.state.loggedIn ? <Facebook.Logout logout={this.logout} /> : null}
        <p>Facebook logged in: {this.state.loggedIn ? 'true' : 'false'}</p>
        <p>User ID is: {this.state.userId}</p>
      </div>
    );
  }
}

export default Auth;
