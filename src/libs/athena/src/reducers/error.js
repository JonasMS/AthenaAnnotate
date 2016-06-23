import * as types from '../constants/actionTypes';

export const error = (state = {}, action) => {
  switch (action.type) {
    case types.ERR_FAILED_REQUEST: {
      return action.data || state;
    }
    default:
      return state;
  }
};

export default error;
