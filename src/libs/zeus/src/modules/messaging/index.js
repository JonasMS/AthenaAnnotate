import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  HAS_MOUNTED,
  GET_USER,
  SEND_USER,
  MODIFY_BODY,
} from '../../../../common/messageTypes';

import { showAthena } from '../interactions';
import { createNote } from '../handlers';
// import iframe from '../../index';

export function postMessageToFrame(iframe, action) {
  iframe.contentWindow.postMessage(action, '*');
}

export function handleMessageEvent(e) {
  switch (e.data.type) {
    case HIDE_IFRAME:
    case SHOW_IFRAME:
      // this.toggleDisplayFrame();
      showAthena();
      break;
    case HAS_MOUNTED:
      return postMessageToFrame({ type: GET_USER });
    case SEND_USER:
      return this.initialLoad(e.data.user);
    case MODIFY_BODY:
      return createNote(e.data.body);
    default:
      return null;// noop , need to return some value
  }
}
