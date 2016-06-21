import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

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

const widget = (
  state = 'HIDE',
  action
) => {
  console.log(state);
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
  console.log('anno:', state);
  switch (action.type) {
    case 'SET_TARGET':
      return Object.assign({}, state, {
        target: action.selector,
      });
    default:
      return state;
  }
};

// const target = (
//   state = {},
//   action
// ) => {
//   switch (action.type) {
//     case types.SET_TARGET:
//       return Object.assign({}, state, {
//         exact: action.exact,
//         prefix: action.prefix,
//         suffix: action.suffix,
//       });
//     default:
//       return state;
//   }
// };

export default combineReducers({
  // view,
  user,
  widget,
  annotation,
  // target,
});
