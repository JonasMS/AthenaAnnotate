import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

// not used now
const view = (state = '', action) => {
  switch (action.type) {
    case types.SHOW_AUTH_PANEL:
      return action;
    case types.SHOW_ANNOTATE_PANEL:
    default:
      return state;
  }
};

export default combineReducers({
  view,
});
