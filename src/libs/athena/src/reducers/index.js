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
const annotation = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const target = (state = {}, action) => {
  switch (action.type) {
    case types.SET_TARGET:
      return Object.assign({}, state, {
        exact: action.exact,
        prefix: action.prefix,
        suffic: action.suffix,
      });
    default:
      return state;
  }
};

export default combineReducers({
  user,
  // view,
  annotation,
  target,
});
