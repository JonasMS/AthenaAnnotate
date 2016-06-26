import * as types from '../constants/actionTypes';
import { AUTH_PANEL, ANNOTATE_PANEL } from '../constants/constants';

const panel = (state = AUTH_PANEL, action) => {
  switch (action.type) {
    case types.SHOW_AUTH_PANEL:
      return AUTH_PANEL;
    case types.SHOW_ANNOTATE_PANEL:
      return ANNOTATE_PANEL;
    default:
      return state;
  }
};

export default panel;
