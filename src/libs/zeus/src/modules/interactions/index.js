import {
  HIDE_CONTROL_BUTTONS_CLASS,
  SHOW_CONTROL_BUTTONS_CLASS,
} from '../../constants';


// Handle Shortcut Keys
export const shortcutHandler = e => {
  if (e.getModifierState('Shift')) {
    if (
      e.code === 'KeyN' &&
      widget === 'HIDE'
    ) {
      adderHandler('note');
    } else if (e.code === 'KeyH') {
      adderHandler(
        'highlight', {
          annotation,
          annotations,
          user,
        }
      );
    }
  } else if (
    e.code === 'Escape' &&
    widget === 'SHOW'
  ) {
    setWidget('HIDE');
  }
};

export const selectionHandler = () => {
  const range = window.getSelection().getRangeAt(0);
  const distance = Math.abs(range.endOffset - range.startOffset);
  const display = this.state.controller;

  // IF a selection is made on mouseup
  if (distance > 0) {
    this.setState({ controls: SHOW_CONTROL_BUTTONS_CLASS });
  } else if (display !== HIDE_CONTROL_BUTTONS_CLASS) {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
  }
};
