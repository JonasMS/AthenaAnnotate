import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default combineReducers({
  user,
});
