import React, { PropTypes } from 'react';
import Doc from './Doc';

const DocList = ({ docs }) => {
  const docList = docs.map(doc => (
    <Doc
      key={doc.id}
      {...doc}
    />
      ));
  return (
    <ul>
      {docList}
    </ul>
  );
};

DocList.propTypes = {
  docs: PropTypes.array.isRequired,
};

export default DocList;
