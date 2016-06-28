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
    <div className="col-md-9">
      <button
        type="button"
        className="btn btn-default"
        aria-label="listView"
        onClick={() => switchView()}
      >
        <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
      </button>
      <ul className="list-group">
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
