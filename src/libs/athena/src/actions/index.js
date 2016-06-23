import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import * as types from '../constants/actionTypes';
import * as options from '../constants/fetchOptions';
import { getText } from '../utils/utils';
import { getUserFromFB } from '../../../common/auth';
import { createAnnote } from '../utils/annotation';
import { checkStatus, createPOST, parseJSON } from '../utils/fetch';
import { placeAnnote } from '../engine/index';

export const failedRequest = error => (
  {
    type: types.ERR_FAILED_REQUEST,
    data: error,
  }
);

export const saveUserToStore = userData => (
  {
    type: types.SAVE_USER_TO_STORE,
    data: userData,
  }
);

export const getUserFromDB = fbUser => {
  const payload = JSON.stringify(fbUser);

  return dispatch => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(res => dispatch(saveUserToStore(res)))
    .catch(err => dispatch(failedRequest(err)));
  };
};

export const login = () => (
  dispatch => (
    window.FB.login(res => {
      if (res.status === 'connected') {
        getUserFromFB().then(user => dispatch(getUserFromDB(user)));
      }
    }, { scope: 'public_profile,email' })
  )
);

export const logout = () => (
  dispatch => (
    window.FB.logout(() => (
      dispatch(saveUserToStore({
        id: null,
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
    const annote = getText();
    if (btn === 'note') {
      dispatch(setTarget(annote));
      dispatch(setWidget('SHOW'));
    } else if (btn === 'highlight') {
      console.log('line 110');
      // create annotation
      dispatch(setTarget(annote));
      // TODO: save annotation ?
    }
    return annote;
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
      console.log(annotation);
      placeAnnote(
        document.getElementsByTagName('body')[0],
        annotation.target.selector.exact
      );
      dispatch(addAnnote(annote));
      // TODO: clearAnnote here?
    });
  }
);
