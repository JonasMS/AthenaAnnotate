import React, { Component, PropTypes } from 'react';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../containers/AnnotatePanel';
// import Adder from '../components/Adder';
// import { setWidgClass } from '../utils/utils';
// import { shortcutHandler } from '../utils/panel';

import {
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

    this.createAnnote = this.createAnnote.bind(this);
    this.createHightlight = this.createHightlight.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
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
  }

  componentWillUnmount() {
    window.removeEventListener('message');
  }

  isUserLoggedIn() {
    const { user } = this.props;
    return user && user.id;
  }

  createAnnote() {
    if (this.isUserLoggedIn()) {
      this.props.actions.showAnnotatePanel();
    } else {
      this.props.actions.showAuthPanel();
    }
  }

  createHightlight() {
    if (this.isUserLoggedIn()) {
      this.props.actions.showAnnotatePanel();
    } else {
      this.props.actions.showAuthPanel();
    }
  }

  // take action on events we know about
  handleMessageEvent(event) {
    switch (event.data.type) {
      case CREATE_ANNOTE:
        return this.createAnnote();
      case CREATE_HIGHLIGHT:
        return this.createHightlight();
      default:
        return undefined;
    }
  }

  render() {
    const { user, actions: { login } } = this.props;

    return (
      <div>
        {
          user && user.id
            ? <AuthPanel login={login} />
            : <AnnotatePanel />
        }
      </div>
    );
    // const widgetClass = setWidgClass(
    //   this.props.widget
    // );

    // const { user, actions: { login, logout } } = this.props;

    // return (
    //   <div>
    //     <div className={widgetClass}>
    //       <div id="fb-root"></div>
    //         {user && user.id ?
    //         <AnnotatePanel logout={logout} /> :
    //         <AuthPanel login={login} />}
    //     </div>
    //     <Adder />
    //   </div>
    // );
  }
}

App.propTypes = {
  // adder: PropTypes.string,
  // widget: PropTypes.string,
  user: PropTypes.object,
  actions: PropTypes.object,
};

export default App;
