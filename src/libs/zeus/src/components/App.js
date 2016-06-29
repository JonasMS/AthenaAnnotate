import React, { PropTypes, Component } from 'react';
import ControlButton from './ControlButton';

import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  CREATE_ANNOTE,
  CREATE_HIGHLIGHT,
  GET_ANNOTE_ID,
  SEND_ANNOTE_ID,
  GET_USER_ID,
  SEND_USER_ID,
  GET_IDS,
  SEND_IDS,
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

import { wrapAnnote, locateAnnote } from '../engine/';

import { saveAnnote, fetchUser, fetchAnnotes } from '../utils/fetches';
import { getText, createAnnote } from '../utils/utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: HIDE_CONTROL_BUTTONS_CLASS,
    };

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.initNote = this.initNote.bind(this);
    this.createHighlight = this.createHighlight.bind(this);
    this.annoteHandler = this.annoteHandler.bind(this);
    this.toggleDisplayFrame = this.toggleDisplayFrame.bind(this);
    this.postMessageToFrame = this.postMessageToFrame.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.handleKeyPressEvent = this.handleKeyPressEvent.bind(this);
    this.handleSelectionEvent = this.handleSelectionEvent.bind(this);
    this.annote = null; // TODO: necessary?
    this.annoteId = 0; // TODO: '0' is for dev purposes
    this.user = null;
    this.getUserIntevalId = null;
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    // window.addEventListener('keypress', this.handleKeyPressEvent);
    document.body.addEventListener('mouseup', this.handleSelectionEvent);
    // this.getUserIntervalId = window.setInterval(() => { this.getUser(); }, 200);
  }

  componentWillUnmount() {
    window.removeEventListener('message');
    // window.removeEventListener('onkeypress');
    // document.removeEventListener('mouseup');
  }

  getUser() {
    this.postMessageToFrame({ type: GET_USER });
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
            const doc = document.body;
            // TODO: send annotes to Athena after placing on DOM
            // send Annotes to Athena
            this.postMessageToFrame({ type: SEND_ANNOTES, annotes });
            // place Annotes on DOM
            annotes.forEach(annote => { locateAnnote(doc, annote); });
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
      this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    }
  }

  handleMessageEvent(event) {
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


      case SEND_IDS:
        return this.annoteHandler(event.data.ids, event.data.kind);
      case SEND_ANNOTE_ID:
        this.annoteId = event.data.annoteId;
        return this.annoteId;
      case SEND_USER_ID:
        this.userId = event.data.userId;
        return this.userId;
      default:
        return null;// noop , need to return some value
    }
  }

  postMessageToFrame(action) {
    this.props.iframe.contentWindow.postMessage(action, '*');
  }

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

  annoteHandler(ids, kind) {
    if (kind === 'highlight') {
      this.createHighlight(ids);
    } else if (kind === 'note') {
      this.createAnnote(ids);
    }
    return kind;
  }

  initNote() {
    if (this.isUserLoggedIn()) {
      this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
      const { selector, range } = getText();
      const annote = createAnnote(selector, this.annoteId, this.user.id);
      this.annote = annote;

      this.postMessageToFrame({ type: CREATE_ANNOTE, annote });
      this.toggleDisplayFrame();
      wrapAnnote(range);
    } // TODO: else show auth panel
  }

  createNote(body) {
    // change annote
    this.annote = Object.assign({}, this.annote, body);
    saveAnnote(this.annote);
    this.toggleDisplayFrame();
    // TODO: this.annote = null ?
  }

  createHighlight() {
    if (this.isUserLoggedIn()) {
      this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
      const { selector, range } = getText();
      const annote = createAnnote(selector, this.annoteId, this.user.id);
      saveAnnote(annote); // POST annote to server to be stored in db
      wrapAnnote(range);
      // TODO: update state.annotations in Athena
      this.annoteId++; // TODO: move into createAnnote
      console.log('annote: ', annote);
    } // TODO: else show auth panel
  }

  handleKeyPressEvent(event) {
    switch (event.key) {
      case '1':
        return this.setState({ controls: SHOW_CONTROL_BUTTONS_CLASS });
      default:
        return this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    }
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
