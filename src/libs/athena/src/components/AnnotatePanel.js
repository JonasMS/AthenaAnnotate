import React from 'react';
import { connect } from 'react-redux';

const AnnotatePanel = () => (
  <div>
    <div className="targetText">
      <input type="text" />
    </div>
    <div className="bodyText">
      <textarea />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  text: state.annotation.target.exact,
});

AnnotatePanel.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(AnnotatePanel);

