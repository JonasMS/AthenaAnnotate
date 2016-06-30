import React, { PropTypes, Component } from 'react';
import ControlButton from './ControlButton';

import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  CREATE_ANNOTE,
  HAS_MOUNTED,
  GET_USER,
  SEND_USER,
  SEND_ANNOTES,
  MODIFY_BODY,
} from '../../../common/messageTypes';

import {
  HIDE_IFRAME_CLASS,
  SHOW_IFRAME_CLASS,
  HIDE_CONTROL_BUTTONS_CLASS,
  SHOW_CONTROL_BUTTONS_CLASS,
} from '../constants';


// import { selectionHandler } from '../modules/interactions';


import { wrapAnnote, locateAnnote } from '../engine/';
import { saveAnnote, fetchUser, fetchAnnotes } from '../utils/fetches';
import { getText, createAnnote } from '../utils/utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: HIDE_CONTROL_BUTTONS_CLASS,
    };
    this.shortcutHandler = this.shortcutHandler.bind(this);
    this.setUser = this.setUser.bind(this);
    this.initNote = this.initNote.bind(this);
    this.createHighlight = this.createHighlight.bind(this);
    this.toggleDisplayFrame = this.toggleDisplayFrame.bind(this);
    this.postMessageToFrame = this.postMessageToFrame.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.handleSelectionEvent = this.handleSelectionEvent.bind(this);
    this.annote = null; // TODO: necessary?
    this.annoteId = 0; // TODO: change to null?
    this.user = null;
    this.getUserIntevalId = null;
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    window.addEventListener('keydown', e => { this.shortcutHandler(e); });
    document.body.addEventListener('mouseup', this.handleSelectionEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('message');
    // window.removeEventListener('onkeypress');
    document.removeEventListener('mouseup');
  }

  getAnnoteId(idString) { // copied to utils/utils
    const endIdx = idString.lastIndexOf('/');
    const startIdx = idString.substring(0, endIdx)
                     .lastIndexOf('e') + 1;
    return parseInt(idString.substring(startIdx, endIdx), 10) + 1;
  }

  setUser(fbAcc) {
    return fetchUser(fbAcc)
      .then(user => {
        this.user = user;
        this.postMessageToFrame({ type: SEND_USER, user });
        console.log(this.user);
        return user;
      });
  }

  initialLoad(fbAcc) {
    this.setUser(fbAcc)
      .then(user => {
        fetchAnnotes(user)
          .then(annotes => {
            console.log('annotes: ', annotes);
            this.annoteId = this.getAnnoteId(annotes[annotes.length - 1].id);
            console.log('annoteId: ', this.annoteId);
            annotes.forEach(annote => { locateAnnote(document.body, annote); });
            this.postMessageToFrame({ type: SEND_ANNOTES, annotes });
          });
      });
  }

  isUserLoggedIn() {
    const { user } = this;
    return user && user.id;
  }

  handleSelectionEvent() {
    const range = window.getSelection().getRangeAt(0);
    const distance = Math.abs(
      range.endOffset - range.startOffset
    );
    const display = this.state.controller;
    // IF a selection is made on mouseup
    if (distance > 0) {
      this.setState({ controls: SHOW_CONTROL_BUTTONS_CLASS });
    } else if (display !== HIDE_CONTROL_BUTTONS_CLASS) {
      const classList = this.props.iframe.classList;
      if (classList.contains(SHOW_IFRAME_CLASS)) {
        this.hideAthena();
      }
      this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    }
  }

  shortcutHandler(e) {
    if (e.getModifierState('Shift')) {
      if (e.code === 'KeyN') {
        this.initNote();
      } else if (e.code === 'KeyH') {
        this.createHighlight();
      }
    } else if (e.code === 'Escape') {
      this.hideAthena();
    }
  }
  showAthena() {
    const classList = this.props.iframe.classList;
    if (classList.contains(HIDE_IFRAME_CLASS)) {
      classList.remove(HIDE_IFRAME_CLASS);
      classList.add(SHOW_IFRAME_CLASS);
    }
  }

  hideAthena() {
    const classList = this.props.iframe.classList;
    if (classList.contains(SHOW_IFRAME_CLASS)) {
      classList.remove(SHOW_IFRAME_CLASS);
      classList.add(HIDE_IFRAME_CLASS);
    }
  }

  handleMessageEvent(event) { // copied to messaging
    switch (event.data.type) {
      case HIDE_IFRAME:
      case SHOW_IFRAME:
        this.toggleDisplayFrame();
        break;
      case HAS_MOUNTED:
        return this.postMessageToFrame({ type: GET_USER });
      case SEND_USER:
        return this.initialLoad(event.data.user);
      case MODIFY_BODY:
        return this.createNote(event.data.body);
      default:
        return null;// noop , need to return some value
    }
  }

  postMessageToFrame(action) { // copied to messaging
    this.props.iframe.contentWindow.postMessage(action, '*');
  }

  // TODO: toggle vs explicit orders?
  toggleDisplayFrame() {
    const classList = this.props.iframe.classList;

    if (classList.contains(SHOW_IFRAME_CLASS)) {
      classList.remove(SHOW_IFRAME_CLASS);
      classList.add(HIDE_IFRAME_CLASS);
    } else {
      classList.remove(HIDE_IFRAME_CLASS);
      classList.add(SHOW_IFRAME_CLASS);
    }
  }

  initNote() {
    if (this.isUserLoggedIn()) {
      this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
      const { selector, range } = getText();
      const annote = createAnnote(selector, this.annoteId, this.user.id);
      this.annote = annote;

      this.postMessageToFrame({ type: CREATE_ANNOTE, annote });
      this.showAthena();
      wrapAnnote(range);
    } // TODO: else show auth panel
  }

  createNote(body) {
    // change annote
    console.log('body: ', body);
    this.annote = Object.assign({}, this.annote, {
      body,
    });
    console.log('annote:', this.annote);
    // saveAnnote(this.annote);
    // this.toggleDisplayFrame();
    this.hideAthena();
    // TODO: this.annote = null ?
  }

  createHighlight() {
    if (this.isUserLoggedIn()) {
      this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
      const { selector, range } = getText();
      const annote = createAnnote(selector, this.annoteId, this.user.id);
      // saveAnnote(annote); // POST annote to server to be stored in db
      wrapAnnote(range);
      // TODO: update state.annotations in Athena
      this.annoteId++; // TODO: move into createAnnote
      console.log('annote: ', annote);
    } // TODO: else show auth panel
  }

  render() {
    return (
      <div className={this.state.controls}>
        <div>
          <ControlButton
            handler={() => { this.initNote(); }}
            label={'Annotate!'}
          />
          <ControlButton
            handler={() => { this.createHighlight(); }}
            label={'Highlight!'}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  iframe: PropTypes.object.isRequired,
};

export default App;
