import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createHandler } from '../utils/handlers';
import * as Actions from '../actions';
import { getText } from '../utils/utils';

class Adder extends Component {

  createHandler(btn) {
    const { setWidget, setTarget } = Actions;

    if (btn === 'note') {
      const { actions } = this.props;
      // change annotation.target
      actions.setTarget(getText());
      // TODO: Why is dispatch needed?
      actions.setWidget('SHOW');
    } else {
      // create annotation
      // add annotation to annotations

    }
  }

  render () {
    let adderClass = 'adder';
    adderClass += this.props.adder === 'HIDE' ?
      ' adder_hide' : ' adder_show';

    return (
      <div className={adderClass}>
        <button
          className="adderBtn"
          onClick={() =>
            this.createHandler('highlight')}
        >H</button>
        <button
          className="adderBtn"
          onClick={() =>
           this.createHandler('note')}
        >N</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adder: state.adder,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

Adder.propTypes = {
  actions: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Adder);
