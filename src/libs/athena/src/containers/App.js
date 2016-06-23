import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';
import Adder from '../components/Adder';

import * as Actions from '../actions';
import { initFB } from '../../../common/auth';
import { placeAnnote } from '../engine/index';
import { setWidgClass } from '../utils/utils';
import { shortcutHandler } from '../utils/panel';

class App extends Component {
  componentWillMount() {
    placeAnnote(document, 'Lorem ipsum');
  }

  componentDidMount() {
    initFB().then(() => {
      this.props.actions.getLoginStatus();
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
      shortcutHandler(e, this.props);
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
          {/*user && user.id*/true ?
            <AnnotatePanel logout={logout} /> :
            <AuthPanel login={login} />}
        </div>
        <Adder />
      </div>
    );
  }
}

App.propTypes = {
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
