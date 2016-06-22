import { SET_USER } from '../../../libs/athena/src/constants/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default user;
