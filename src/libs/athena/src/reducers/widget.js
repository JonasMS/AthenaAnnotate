import * as types from '../constants/actionTypes';

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

export default widget;
