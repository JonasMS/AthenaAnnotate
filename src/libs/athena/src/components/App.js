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
} from '../../../common/messageTypes';

import {
  initFB,
  getUserFromFB,
  getUserStatusFromFB,
} from '../../../common/auth';


class App extends Component {
  constructor(props) {
    super(props);

    this.hideFrame = this.hideFrame.bind(this);
    this.createAnnote = this.createAnnote.bind(this);
    this.createHightlight = this.createHightlight.bind(this);
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
                this.props.actions.getUserFromDB(user);
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

  isUserLoggedIn() {
    const { user } = this.props;
    return user && user.id;
  }

  createAnnote(data) {
    if (this.isUserLoggedIn()) {
      console.log(data);
      // data passed must update the state, then the state
      // must be passed into AnnotatePanel so it can display
      // fields values with the data.
    } else {
      console.log('[createAnnote]: user not logged in');
    }
  }

  createHightlight(data) {
    if (this.isUserLoggedIn()) {
      console.log(data);
      // highlighting is done by content.js.
      // but the data it passed must be saved to the db.
    } else {
      console.log('[createHightlight]: user not logged in');
      this.postMessageToParent({ type: SHOW_IFRAME });
    }
  }

  postMessageToParent(action) {
    parent.postMessage(action, '*');
  }

  hideFrame() {
    this.postMessageToParent({ type: HIDE_IFRAME });
  }

  // take action on events we know about
  handleMessageEvent(event) {
    switch (event.data.type) {
      case CREATE_ANNOTE:
        return this.createAnnote(event.data);
      case CREATE_HIGHLIGHT:
        return this.createHightlight(event.data);
      default:
        return undefined;
    }
  }

  render() {
    const { actions: { login } } = this.props;

    return (
      <div>
        {
          this.isUserLoggedIn()
            ? <AnnotatePanel close={this.hideFrame} />
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
  actions: PropTypes.object,
};

export default App;
