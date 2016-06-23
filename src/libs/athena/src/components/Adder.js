import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createHandler } from '../utils/handlers';
import * as Actions from '../actions';
import { setAddClass } from '../utils/utils';

class Adder extends Component {

  createHandler(btn) {
    const { actions } = this.props;
    if (btn === 'note') {
      actions.adderHandler('note');
    } else if (btn === 'highlight') {
      actions.adderHandler(
        'highlight',
        this.props
      );
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
  actions: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Adder);
