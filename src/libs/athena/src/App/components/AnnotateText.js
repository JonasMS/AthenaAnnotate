import React from 'react';

const AnnotateText = ({ target }) => (
  <div className="widget-annotateText">
    {target}
  </div>
);

export default AnnotateText;

AnnotateText.propTypes = {
  target: React.PropTypes.string.isRequired,
};
