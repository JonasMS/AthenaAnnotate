import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  HAS_MOUNTED,
  GET_USER,
  SEND_USER,
  MODIFY_BODY,
} from '../../../../common/messageTypes';

import iframe from '../../index';

export const postMessageToFrame = action => {
  iframe.contentWindow.postMessage(action, '*');
};

export const handleMessageEvent = e => {
  switch (e.data.type) {
    case HIDE_IFRAME:
    case SHOW_IFRAME:
      this.toggleDisplayFrame();
      break;
    case HAS_MOUNTED:
      return this.postMessageToFrame({ type: GET_USER });
    case SEND_USER:
      return this.initialLoad(e.data.user);
    case MODIFY_BODY:
    return this.createNote(e.data.body);
    default:
      return null;// noop , need to return some value
  }
};
