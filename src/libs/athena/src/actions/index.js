import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import { getText } from '../utils/utils';
import { getUserFromFB } from '../../../common/auth';

export const failedRequest = error => (
  {
    type: types.ERR_FAILED_REQUEST,
    data: error,
  }
);

export const showAuthPanel = () => (
  {
    type: types.SHOW_AUTH_PANEL,
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

