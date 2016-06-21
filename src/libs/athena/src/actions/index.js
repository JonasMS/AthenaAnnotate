/* global FB */
import * as types from '../constants/actionTypes';

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

// adder actions
export const setAdder = adder => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const distance = Math.abs(
    range.endOffset - range.startOffset
  );
  let display = adder;

  if (distance > 0) {
    if (adder !== 'SHOW') {
      display = 'SHOW';
    }
  } else {
    if (adder !== 'HIDE') {
      display = 'HIDE';
    }
  }

  return {
    type: 'SET_ADDER',
    display,
  };
};

// widget actions
export const setWidget = (display) => ({
  type: types.SET_WIDGET,
  display,
});

// annotation actions
export const updateBody = (text) => ({
  type: types.UPDATE_BODY,
  text,
});

export const setTarget = (target) => ({
  type: types.SET_TARGET,
  selector: target,
});

export const clearAnnote = () => ({
  type: types.CLEAR_ANNOTATION,
});
