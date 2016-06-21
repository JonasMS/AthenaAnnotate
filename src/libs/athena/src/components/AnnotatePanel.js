import React from 'react';
import FacebookLogout from './FacebookLogout';
import { connect } from 'react-redux';

const AnnotatePanel = ({ logout, text }) => (
  <div>
    <h1> AnnotatePanel </h1>
    <div>
      <div>
        <FacebookLogout logout={logout} />
      </div>
      <div className="targetText">
        <input
          type="text"
          value={text}
        />
      </div>
      <div className="bodyText">
        <textarea />
      </div>
    </div>
  </div>
);

AnnotatePanel.propTypes = {
  logout: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  text: state.annotation.target.exact,
});

export default connect(mapStateToProps)(AnnotatePanel);
