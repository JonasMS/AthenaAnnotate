import React, { PropTypes } from 'react';
import Doc from './Doc';

const DocList = ({ docs, onDocDelete, listView, switchView, filter }) => {
  const docList = docs.map(doc => (
    <Doc
      key={doc.id}
      {...doc}
      onDocDelete={() => onDocDelete(doc.id)}
      listView={listView}
      filter={filter}
    />
      ));
  return (
    <div className="col s6">
      <button
        onClick={() => switchView()}
      >Switch Views
      </button>
      <ul>
        {docList}
      </ul>
    </div>
  );
};

DocList.propTypes = {
  docs: PropTypes.array.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
  switchView: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default DocList;
