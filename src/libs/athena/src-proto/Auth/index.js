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
    window.FB.getLoginStatus(res => {
      console.log(res, '<-- get login status');
      if (res.status === 'connected') {
        this.setState({
          facebookAuthData: res,
          loggedIn: true,
          userId: res.authResponse.userID,
        });
      }
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
    window.FB.login(res => {
      if (res.status === 'connected') {
        console.log(res, '<-- login');
        this.setState({
          facebookAuthData: res,
          loggedIn: true,
          userId: res.authResponse.userID,
        });

        window.FB.api('/me?fields=id,email,name', resp => {
          console.log(resp, '<-- /me');
        }, { scope: 'email' });
      }
    }, { scope: 'public_profile,email' });
  }

  logout() {
    window.FB.logout(res => {
      console.log(res, '<-- logout');
      this.setState({
        facebookAuthData: res,
        loggedIn: false,
        userId: null,
      });
    });
  }

  render() {
    return (
      <div>
        <div id="fb-root"></div>
        {!this.state.loggedIn ?
          <div>
            <p> Please Login </p>
            <Facebook.Login login={this.login} />
          </div>
          : null}
        {this.state.loggedIn ?
          <div>
            <p>User ID is: {this.state.userId}</p>
            <Facebook.Logout logout={this.logout} />
          </div>
          : null}
      </div>
    );
  }
}

export default Auth;
