import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';
import Adder from '../components/Adder';

import * as Actions from '../actions';
import { parseDoc } from '../engine/index';
import { setWidgClass } from '../utils/utils';
import { shortcutHandler } from '../utils/panel';
import { initFB, getUserFromFB, getUserStatusFromFB } from '../../../common/auth';

class App extends Component {
  componentWillMount() {
    console.log(
      parseDoc(document.body)
    );
  }

  componentDidMount() {
    initFB().then(() => {
      getUserStatusFromFB().then(status => {
        if (status === 'connected') {
          getUserFromFB().then(user => {
            return user
              ? this.props.actions.getUserFromDB(user)
              : this.props.actions.failedRequest({ error: 'no FB user' });
          });
        }
      });
    });

    // listener for mouseups
    document
    .getElementsByTagName('body')[0]
    .addEventListener('mouseup', () => {
      const { adder, actions } = this.props;
      actions.setAdder(adder);
    });

    // listener for shortcut keys
    window
    .addEventListener('keydown', e => {
      const {
        annotation,
        annotations,
        user,
        widget,
        actions,
      } = this.props;
      shortcutHandler(
        e, {
          annotation,
          annotations,
          user,
          widget,
          actions,
        }
      );
    });
  }

  render() {
    const widgetClass = setWidgClass(
      this.props.widget
    );

    const { user, actions: { login, logout } } = this.props;

    return (
      <div>
        <div className={widgetClass}>
          <div id="fb-root"></div>
          {/* user && user.id */true ?
            <AnnotatePanel logout={logout} /> :
            <AuthPanel login={login} />}
        </div>
        <Adder />
      </div>
    );
  }
}

App.propTypes = {
  adder: PropTypes.string,
  widget: PropTypes.string,
  user: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  annotation: state.annotation,
  annotations: state.annotations,
  widget: state.widget,
  adder: state.adder,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
