import { SAVE_USER_TO_STORE } from '../constants/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER_TO_STORE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default user;
