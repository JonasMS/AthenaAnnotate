import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';
import Adder from '../components/Adder';

import * as Actions from '../actions';
import { initFB } from '../../../common/auth';
import { adderHandler } from '../utils/handlers';
import { saveAnnote } from '../utils/annotation';
import { setWidgClass } from '../utils/utils';

class App extends Component {
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

    // listener for esc key
    window
    .addEventListener('keydown', e => {
      const {
        annotation,
        annotations,
        user,
        widget,
        actions,
      } = this.props;
      console.log(e.code);
      // console.log(e.getModifierState())
      if (
        e.code === 'Escape' &&
        widget === 'SHOW'
      ) {
        actions.setWidget('HIDE');
      } else if (e.getModifierState('Shift')) {
        if (e.code === 'KeyN') {
          actions.adderHandler('note');
        } else if (e.code === 'KeyH') {
          actions.adderHandler('highlight');
          saveAnnote({
            annotation,
            annotations,
            user,
          });
          actions.clearAnnote();
        }
      }
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
  store: PropTypes.object,
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
