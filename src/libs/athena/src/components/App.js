import React, { Component, PropTypes } from 'react';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../containers/AnnotatePanel';
import {
  HIDE_IFRAME,
  SHOW_IFRAME,
  CREATE_ANNOTE,
  CREATE_HIGHLIGHT,
  SEND_ANNOTE_ID,
  HAS_MOUNTED,
  GET_USER,
  SEND_USER,
  SEND_ANNOTES,
  MODIFY_BODY,
} from '../../../common/messageTypes';

import {
  initFB,
  getUserFromFB,
  getUserStatusFromFB,
} from '../../../common/auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.sendUser = this.sendUser.bind(this);
    this.hideFrame = this.hideFrame.bind(this);
    this.createAnnote = this.createAnnote.bind(this);
    this.createHighlight = this.createHighlight.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.postMessageToParent = this.postMessageToParent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    window.addEventListener('click', this.handleClickEvent);

    initFB()
      .then(() => getUserStatusFromFB())
      .then(status => {
        if (status === 'connected') {
          getUserFromFB()
            .then(user => {
              if (user) {
                this.extIntervalId = window.setInterval(() => {
                  this.postMessageToParent({ type: HAS_MOUNTED });
                }, 100);
                // TODO: use property in this?
                this.fbAcc = user;
                // this.props.actions.getUserFromDB(user);
              }
            });
        }
      });
  }

  componentWillUnmount() {
    window.removeEventListener('message');
  }

  sendUser() {
    window.clearInterval(this.extIntervalId);
    this.postMessageToParent({
      type: SEND_USER,
      user: this.fbAcc,
    });
  }

  isUserLoggedIn() {
    const { user } = this.props;
    return user && user.id;
  }

  createAnnote(annote) {
    const { actions: { setAnnote } } = this.props;
    setAnnote(annote); // set annotation
  }

  createHighlight(data) {
    if (this.isUserLoggedIn()) {
      this.props.actions.saveAnnote(data.annote);
    } else {
      console.log('[createHighlight]: user not logged in');
      this.postMessageToParent({ type: SHOW_IFRAME });
    }
  }

  postMessageToParent(action) {
    parent.postMessage(action, '*');
  }

  hideFrame() {
    this.postMessageToParent({ type: HIDE_IFRAME });
  }

  submitHandler() {
    const { actions: { addAnnote, clearAnnote }, annotation } = this.props;
    const { body } = annotation;
    this.postMessageToParent({ type: MODIFY_BODY, body });
    addAnnote(annotation); // add annotation to annotations
    clearAnnote(); // rest annote to empty shape
  }

  // take action on events we know about
  handleMessageEvent(event) {
    const { actions: {
      saveUserToStore,
      addAnnote,
      },
     } = this.props;
    switch (event.data.type) {
      case SEND_USER:
        return saveUserToStore(event.data.user);
      case SEND_ANNOTES:
        return addAnnote(event.data.annotes);
      case CREATE_ANNOTE:
        return this.createAnnote(event.data.annote);
      case CREATE_HIGHLIGHT:
        return this.createHighlight(event.data);
      case GET_USER:
        return this.sendUser();
      default:
        return undefined;
    }
  }

  render() {
    const { actions: { login } } = this.props;
    console.log('props: ', this.props);
    return (
      <div>
        {
          this.isUserLoggedIn()
            ? <AnnotatePanel close={this.hideFrame} submitHandler={this.submitHandler} />
            : <AuthPanel login={login} close={this.hideFrame} />
        }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  actions: PropTypes.object,
};

export default App;
