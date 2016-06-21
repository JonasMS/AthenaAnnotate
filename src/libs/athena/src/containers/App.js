import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';
import Adder from '../components/Adder';

import * as Actions from '../actions';
import { initFB } from '../../../common/auth';

import { adderHandler } from '../utils/handlers';

// const style = {
//   textAlign: 'center',
//   width: '500px',
//   height: '500px',
//   backgroundColor: 'lightblue',
//   position: 'absolute',
//   top: 0,
//   right: 0,
// };

class App extends Component {
  componentDidMount() {
    initFB().then(() => {
      this.props.actions.getLoginStatus();
    }
    // make listener for mouseups
    const { setWidget } = Actions;
    // listener for mouseups
    document
    .getElementsByTagName('body')[0]
    .addEventListener('mouseup', () => {
      adderHandler();
    });

    // listener for esc key
    window
    .addEventListener('keydown', e => {
      const { widget, actions } = this.props;
      if (
        e.code === 'Escape' &&
        widget === 'SHOW'
      ) {
        actions.setWidget('HIDE');
      }
    });
  }

  render () {
    console.log('widg:', this.props);
    console.log(this.state);
    // TODO: cleanup
    let widgetClass = 'widget ';
    widgetClass += this.props.widget === 'HIDE' ?
      'widget_hide' : 'widget_show';

    const { user, actions: { login, logout } } = this.props;

    return (
      <div>
        <div className={widgetClass}>
          <div id="fb-root"></div>
          {this.props.user ? <AnnotatePanel /> : <AuthPanel />}
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
  widget: state.widget,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
