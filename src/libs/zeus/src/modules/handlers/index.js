import { CREATE_ANNOTE } from '../../../../common/messageTypes';
import { HIDE_CONTROL_BUTTONS_CLASS } from '../../constants';
import { getText, createAnnote, wrapAnnote } from '../engine';
import { saveAnnote } from '../../utils/fetches';
import { showAthena, hideAthena, postMessageToFrame } from '../interactions';


export function initNote() {
  if (this.isUserLoggedIn()) {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    const { selector, range } = getText();
    const annote = createAnnote(selector, this.annoteId, this.user.id);
    this.annote = annote;

    postMessageToFrame(this.props.frame, { type: CREATE_ANNOTE, annote });
    // this.toggleDisplayFrame();
    showAthena();
    wrapAnnote(range);
  } // TODO: else show auth panel
}

export function createHighlight() {
  if (this.isUserLoggedIn()) {
    const { selector, range } = getText();
    const annote = createAnnote(selector, this.annoteId, this.user.id);
    saveAnnote(annote); // POST annote to server to be stored in db
    wrapAnnote(range);
    // TODO: update state.annotations in Athena
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    this.annoteId++;
    // console.log('annote: ', annote);
  } // TODO: else show auth panel
}

export function createNote(annote, body) {
  // console.log('body: ', body);
  annote = Object.assign({}, annote, { body });
  // console.log('annote:', annote);
  saveAnnote(annote);
  // this.toggleDisplayFrame();
  hideAthena();
  // TODO: this.annote = null ?
}
