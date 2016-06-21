/* global FB */
import * as types from '../constants/actionTypes';
import { getText } from '../utils/utils';

export const getLoginStatus = () => {
  window.FB.getLoginStatus(res => {
    return dispatch => {

    };
  });
};

export const initFacebook = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: process.env.FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v2.6',
    });

    getLoginStatus();
  };

  (function(d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    const js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

export const setWidget = (display) => ({
  type: types.SET_WIDGET,
  display,
});

export const setTarget = () => ({
  type: types.SET_TARGET,
  selector: getText(),
});
