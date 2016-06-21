import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
// import babel-polyfill
require('es6-promise').polyfill();

class AnnotatePanel extends Component {

  submitHandler () {
    const { annotation } = this.props;
    // send annotation object to server
    fetch('http://localhost:3000/api/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(annotation),
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('bad response on create')
      }
    });
  }

  render () {
    return (
      <div>
        <div className="targetText">
          <input
            type="text"
            value={this.props.exact}
          />
        </div>
        <div className="bodyText">
          <textarea />
        </div>
        <button
          className="submitBtn"
          onClick={() => this.submitHandler()}
        >Submit</button>
      </div>

    );
  }
};

const mapStateToProps = (state) => ({
  annotation: state.annotation,
  exact: state.annotation.target.exact,

});

AnnotatePanel.propTypes = {
  exact: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(AnnotatePanel);

