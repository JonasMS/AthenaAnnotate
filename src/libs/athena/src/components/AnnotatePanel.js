import FacebookLogout from './FacebookLogout';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
// import babel-polyfill
require('es6-promise').polyfill();
import * as Actions from '../actions';
import { saveAnnote } from '../utils/annotation';

class AnnotatePanel extends Component {

  submitHandler () {
    const {
      annotation,
      annotations,
      user,
      actions,
       } = this.props;
    // send annotation object to server
    saveAnnote({
      annotation,
      annotations,
      user,
    });
    // update annotations
    actions.clearAnnote();
    // TODO: hide widget
  }

  render () {
    const { annotation, actions } = this.props;
    return (
      <div>
        <div className="targetText">
          <input
            type="text"
            value={this.props.exact}
          />
        </div>
        <div className="bodyText">
          <textarea
            value={
              annotation.body.text
            }
            onChange={(e) =>
              actions.updateBody(
                e.target.value
              )
            }
          />
        </div>
        <button
          className="submitBtn"
          onClick={() => this.submitHandler()}
        >Submit</button>
        <div>
          <FacebookLogout
            logout={actions.logout}
          />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  annotation: state.annotation,
  annotations: state.annotations,
  user: state.user,
  exact: state.annotation.target.exact,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

AnnotatePanel.propTypes = {
  exact: React.PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnotatePanel);
