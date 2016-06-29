import { CREATE_ANNOTE } from '../../../common/messageTypes';
import { HIDE_CONTROL_BUTTONS_CLASS } from '../constants';
import { getText, createAnnote, wrapAnnote } from '../modules/engine';
import { saveAnnote } from './fetches';

export const initNote = () => {
  if (this.isUserLoggedIn()) {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    const { selector, range } = getText();
    const annote = createAnnote(selector, this.annoteId, this.user.id);
    this.annote = annote;

    this.postMessageToFrame({ type: CREATE_ANNOTE, annote });
    this.toggleDisplayFrame();
    wrapAnnote(range);
  } // TODO: else show auth panel
};


export const createHighlight = () => {
  if (this.isUserLoggedIn()) {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    const { selector, range } = getText();
    const annote = createAnnote(selector, this.annoteId, this.user.id);
    saveAnnote(annote); // POST annote to server to be stored in db
    wrapAnnote(range);
    // TODO: update state.annotations in Athena
    this.annoteId++; // TODO: move into createAnnote
    // console.log('annote: ', annote);
  } // TODO: else show auth panel
};

export const createNote = body => {
  // console.log('body: ', body);
  this.annote = Object.assign({}, this.annote, { body });
  // console.log('annote:', this.annote);
  saveAnnote(this.annote);
  this.toggleDisplayFrame();
  // TODO: this.annote = null ?
};
