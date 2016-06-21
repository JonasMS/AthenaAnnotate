import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createHandler } from '../utils/handlers';
import * as Actions from '../actions';

const Adder = ({ actions, dispatch }) => (
  <div className="adder">
    <button
      className="adderButton"
      onClick={() => createHandler(
        'highlight',
        dispatch
      )}
    >H</button>
    <button>N</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

Adder.propTypes = {
  actions: React.PropTypes.object,
};

export default connect(mapDispatchToProps)(Adder);
