import React, { Component, PropTypes } from 'react';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../containers/AnnotatePanel';
// import Adder from '../components/Adder';
// import { setWidgClass } from '../utils/utils';
// import { shortcutHandler } from '../utils/panel';
import {
  HIDE_IFRAME,
  SHOW_IFRAME,
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
  initFB,
  getUserFromFB,
  getUserStatusFromFB,
} from '../../../common/auth';

import { createAnnote } from '../utils/annotation';

class App extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.sendUser = this.sendUser.bind(this);
    this.hideFrame = this.hideFrame.bind(this);
    this.createAnnote = this.createAnnote.bind(this);
    this.createHightlight = this.createHightlight.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.postMessageToParent = this.postMessageToParent.bind(this);
  }

  componentWillMount() {
    // fetch annotations for
    // specific user and url

    // forEach annotation
    // insert annote into dom
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

    // // listener for mouseups
    // document
    // .getElementsByTagName('body')[0]
    // .addEventListener('mouseup', () => {
    //   const { adder, actions } = this.props;
    //   actions.setAdder(adder);
    // });

    // // listener for shortcut keys
    // window
    // .addEventListener('keydown', e => {
    //   shortcutHandler(e, this.props);
    // });

    // listener for shortcut keys
    // window
    // .addEventListener('keydown', e => {
    //   const {
    //     annotation,
    //     annotations,
    //     user,
    //     widget,
    //     actions,
    //   } = this.props;
    //   shortcutHandler(
    //     e, {
    //       annotation,
    //       annotations,
    //       user,
    //       widget,
    //       actions,
    //     }
    //   );
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('message');
  }

  sendUser() {
    // if (this.isUserLoggedIn()) {
    window.clearInterval(this.extIntervalId);
    this.postMessageToParent({
      type: SEND_USER,
      user: this.fbAcc,
    });
    // }
  }

  isUserLoggedIn() {
    const { user } = this.props;
    return user && user.id;
  }

  createAnnote(annote) {
    const { actions: { setAnnote } } = this.props;
    setAnnote(annote); // set annotation
  }

  createHightlight(data) {
    if (this.isUserLoggedIn()) {
      // create annotation object
      console.log('data: ', data);
      console.log('data.annote: ', data.annote);
      this.props.actions.saveAnnote(data.annote);

      // highlighting is done by content.js.
      // but the data it passed must be saved to the db.
    } else {
      console.log('[createHightlight]: user not logged in');
      this.postMessageToParent({ type: SHOW_IFRAME });
    }
  }

  sendAnnoteId() {
    // TODO: replace annotations.length
    const annoteId = this.props.annotations.length;
    console.log('annoteId: ', annoteId);
    this.postMessageToParent({
      type: SEND_ANNOTE_ID,
      annoteId,
    });
    return annoteId;
  }

  sendUserId() {
    console.log('user: ', this.props.user);
    const userId = this.props.user.id;
    this.postMessageToParent({
      type: SEND_USER_ID,
      userId,
    });
    return userId;
  }

  sendIds(kind) {
    const userId = this.props.user.id;
    const annoteId = this.props.annotations.length;
    this.postMessageToParent({
      kind,
      type: SEND_IDS,
      ids: { userId, annoteId },
    });
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
        return this.createHightlight(event.data);
      case GET_USER:
        return this.sendUser();
      case GET_IDS:
        return this.sendIds(event.data.kind);
      case GET_ANNOTE_ID:
        return this.sendAnnoteId();
      case GET_USER_ID:
        return this.sendUserId();
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
  // adder: PropTypes.string,
  // widget: PropTypes.string,
  user: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  actions: PropTypes.object,
};

export default App;
