import React, { PropTypes } from 'react';
import Doc from './Doc';

const DocList = ({ docs, onDocDelete }) => {
  const docList = docs.map(doc => (
    <Doc
      key={doc.id}
      {...doc}
      onDocDelete={() => onDocDelete(doc.id)}
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
  onDocDelete: PropTypes.func.isRequired,
};

export default DocList;
