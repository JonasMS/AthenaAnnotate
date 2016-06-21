import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER:
      return Object.assign({}, state, action.data);
// not used now
// const view = (state = '', action) => {
//   switch (action.type) {
//     case types.SHOW_AUTH_PANEL:
//       return action;
//     case types.SHOW_ANNOTATE_PANEL:
//     default:
//       return state;
//   }
// };
const user = (
  state = {},
  action
) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
};

const adder = (
  state = 'HIDE',
  action
) => {
  switch (action.type) {
    case 'SET_ADDER':
      return action.display;
    default:
      return state;
  }
};

const widget = (
  state = 'HIDE',
  action
) => {
  switch (action.type) {
    case types.SET_WIDGET:
      return action.display;
    default:
      return state;
  }
};

const annotation = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CLEAR_ANNOTATION:
      return Object.assign({}, state, {
        body: {
          lastModified: '',
          text: '',
        },
        target: {
          exact: '',
          prefix: '',
          suffix: '',
        },
      });
    case 'UPDATE_BODY':
      return Object.assign({}, state, {
        body: {
          lastModified: Date.now(),
          text: action.text,
        },
      });
    case types.SET_TARGET:
      return Object.assign({}, state, {
        target: action.selector,
      });
    default:
      return state;
  }
};

const annotations = (
  state = [],
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  user,
  // view,
  adder,
  user,
  widget,
  annotation,
  annotations,
});
