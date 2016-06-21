import * as types from '../constants/actionTypes';
import { getText } from '../utils/utils';

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

export const setWidget = (display) => ({
  type: types.SET_WIDGET,
  display,
});

export const setTarget = () => ({
  type: types.SET_TARGET,
  selector: getText(),
});
