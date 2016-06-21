import React from 'react';
import FacebookLogout from './FacebookLogout';

const AnnotatePanel = ({ logout }) => (
  <div>
    <h1> AnnotatePanel </h1>
    <div>
      <div>
        <FacebookLogout logout={logout} />
      </div>
    </div>
  </div>
);

AnnotatePanel.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

export default AnnotatePanel;
