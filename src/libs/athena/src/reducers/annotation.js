import * as types from '../constants/actionTypes';

const annotation = (
  state = {
    body: {
      lastModified: '',
      text: '',
    },
    target: {
      source: '',
      selector: {
        exact: '',
        prefix: '',
        suffix: '',
      },
    },
  },
  action
) => {
  switch (action.type) {
    case types.SET_ANNOTATION:
      return action.annote;
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
    case types.UPDATE_BODY:
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

export default annotation;
