import fetch from 'isomorphic-fetch';
// import babel-polyfill
require('es6-promise').polyfill();

import * as types from '../constants/actionTypes';
import * as options from '../constants/fetchOptions';
import { getText } from '../utils/utils';
import { createAnnote } from '../utils/annotation';
import { checkStatus, createPOST, parseJSON } from '../utils/fetch';

export const setUser = userData => ({
  type: types.SET_USER,
  data: userData,
});

const getUserData = dispatch => (
  window.FB.api(
    '/me?fields=id,email,name',
    resp => dispatch(setUser(resp)),
    { scope: 'email' }
  )
);

export const getLoginStatus = () =>
  dispatch => window.FB.getLoginStatus(() => getUserData(dispatch));

export const login = () => (
  dispatch => (
    window.FB.login(res => {
      if (res.status === 'connected') {
        return getUserData(dispatch);
      }
      return undefined;
    }, { scope: 'public_profile,email' })
  )
);

export const logout = () => (
  dispatch => (
    window.FB.logout(() => (
      dispatch(setUser({
        id: null,
        accessToken: null,
      }))
    ))
  )
);

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

export const addAnnote = annote => ({
  type: 'ADD_ANNOTE',
  annote,
});

export const adderHandler = btn => (
  dispatch => {
    if (btn === 'note') {
      dispatch(setTarget(getText()));
      dispatch(setWidget('SHOW'));
    } else if (btn === 'hightlight') {
      // create annotation
      dispatch(setTarget(getText()));
      // TODO: save annotation ?
    }
  }
);

export const saveAnnote = data => (
  dispatch => {
    // create full annotation object
    const annotation = createAnnote(data);

    fetch(
      options.API_CREATE,
      createPOST(annotation)
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(annote => {
      dispatch(addAnnote(annote));
      console.log(annote);
    });
  }
);

