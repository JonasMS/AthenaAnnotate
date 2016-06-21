import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';
import Adder from '../components/Adder';

import * as Actions from '../actions';

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
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="widget">
          {this.props.user ? <AnnotatePanel /> : <AuthPanel />}
        </div>
        <Adder />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
};

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(Actions, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
