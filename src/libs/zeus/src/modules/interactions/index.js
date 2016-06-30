import {
  HIDE_IFRAME_CLASS,
  SHOW_IFRAME_CLASS,
  HIDE_CONTROL_BUTTONS_CLASS,
  SHOW_CONTROL_BUTTONS_CLASS,
} from '../../constants';

import { createHighlight, initNote } from '../handlers';
// import iframe from '../../index';

export function toggleDisplayFrame() {
  const classList = this.props.iframe.classList;

  if (classList.contains(SHOW_IFRAME_CLASS)) {
    classList.remove(SHOW_IFRAME_CLASS);
    classList.add(HIDE_IFRAME_CLASS);
  } else {
    classList.remove(HIDE_IFRAME_CLASS);
    classList.add(SHOW_IFRAME_CLASS);
  }
}

export function hideAthena() {
  const classList = this.props.iframe.classList;
  if (classList.contains(HIDE_IFRAME_CLASS)) {
    classList.remove(HIDE_IFRAME_CLASS);
    classList.add(SHOW_IFRAME_CLASS);
  }
}

export function showAthena() {
  const classList = this.props.iframe.classList;
  if (classList.contains(SHOW_IFRAME_CLASS)) {
    classList.remove(SHOW_IFRAME_CLASS);
    classList.add(HIDE_IFRAME_CLASS);
  }
}

// Handle Shortcut Keys
export function shortcutHandler(e) {
  const classList = this.props.iframe.classList;
  if (e.getModifierState('Shift')) {
    if (e.code === 'KeyN' && classList.contains(HIDE_IFRAME_CLASS)) {
      // adderHandler('note');
      initNote();
    } else if (e.code === 'KeyH') {
      // adderHandler(
      //   'highlight', {
      //     annotation,
      //     annotations,
      //     user,
      //   }
      // );
      createHighlight();
    }
  } else if (e.code === 'Escape') {
    // setWidget('HIDE');
    hideAthena();
  }
}

export function selectionHandler() {
  const range = window.getSelection().getRangeAt(0);
  const distance = Math.abs(range.endOffset - range.startOffset);
  const display = this.state.controller;

  // IF a selection is made on mouseup
  if (distance > 0) {
    this.setState({ controls: SHOW_CONTROL_BUTTONS_CLASS });
  } else if (display !== HIDE_CONTROL_BUTTONS_CLASS) {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
  }
}
