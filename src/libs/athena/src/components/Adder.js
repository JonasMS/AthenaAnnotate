import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createHandler } from '../utils/handlers';
import * as Actions from '../actions';
import { getText, setAddClass } from '../utils/utils';

class Adder extends Component {

  createHandler(btn) {
    if (btn === 'note') {
      const { actions } = this.props;
      // change annotation.target
      actions.setTarget(getText());
      // TODO: Why is dispatch needed?
      actions.setWidget('SHOW');
    } else if (btn === 'highlight') {
      // create annotation
      // add annotation to annotations

    }
  }

  render () {
    const adderClass = setAddClass(
      this.props.adder
    );

    return (
      <div className={adderClass}>
        <button
          className="adderBtn"
          onClick={() =>
            this.createHandler('highlight')}
        >
          H
        </button>
        <button
          className="adderBtn"
          onClick={() =>
           this.props.actions
           .adderHandler(
            'note'
          )}
        >
          N
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adder: state.adder,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
  dispatch,
});

Adder.propTypes = {
  adder: React.PropTypes.string,
  actions: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Adder);
