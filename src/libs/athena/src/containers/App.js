import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../components/AnnotatePanel';
import Adder from '../components/Adder';

import * as Actions from '../actions';
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
    // listener for mouseups
    document
    .getElementsByTagName('body')[0]
    .addEventListener('mouseup', () => {
      const { actions } = this.props;
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      const distance = Math.abs(
        range.endOffset - range.startOffset
      );

      if (distance > 0) {
        if (this.props.adder !== 'SHOW') {
          actions.setAdder('SHOW');
        }
      } else {
        if (this.props.adder !== 'HIDE') {
          actions.setAdder('HIDE');
        }
      }
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

  render() {
    console.log('widg:', this.props);
    console.log(this.state);
    // TODO: cleanup
    let widgetClass = 'widget ';
    widgetClass += this.props.widget === 'HIDE' ?
      'widget_hide' : 'widget_show';

    return (
      <div>
        <div className={widgetClass}>
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

const mapStateToProps = (state) => ({
  user: state.user,
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

// export default App;
