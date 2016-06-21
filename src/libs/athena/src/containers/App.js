import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';

import * as Actions from '../actions';
import { initFB } from '../../../common/auth';

const style = {
  textAlign: 'center',
  width: '500px',
  height: '500px',
  backgroundColor: 'lightblue',
  position: 'absolute',
  top: 0,
  right: 0,
};

class App extends Component {
  componentDidMount() {
    initFB().then(() => {
      this.props.actions.getLoginStatus();
    });
  }

  render() {
    const { user, actions: { login, logout } } = this.props;
    return (
      <div style={style}>
        <div id="fb-root"></div>
        {
          user && user.id
          ? <AnnotatePanel logout={logout} />
          : <AuthPanel login={login} />
        }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  store: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
