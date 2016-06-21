import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createHandler } from '../utils/handlers';
import * as Actions from '../actions';

class Adder extends Component {

  createHandler(btn) {
    const { setWidget, setTarget } = Actions;

    if (btn === 'note') {
      // change annotation.target
      this.props.dispatch(setTarget());
      // TODO: Why is dispatch needed?
      this.props.dispatch(setWidget('SHOW'));
    } else {
      // create annotation
      // add annotation to annotations

    }

  }

  render () {
    return (
      <div className="adder">
        <button
          className="adderButton"
          onClick={() =>
            this.createHandler('highlight')}
        >H</button>
        <button
          className="adderButton"
          onClick={() =>
           this.createHandler('note')}
        >N</button>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

Adder.propTypes = {
  actions: React.PropTypes.object,
};

export default connect(mapDispatchToProps)(Adder);
