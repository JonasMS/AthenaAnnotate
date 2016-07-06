import React, { PropTypes } from 'react';
import Doc from './Doc';

const DocList = ({ user, docs, onDocDelete, listView, switchView, filter, showMembers, group, updateDocPrivacy }) => {
  const docList = docs.map(doc => (
    <Doc
      key={doc.id}
      {...doc}
      user={user}
      onDocDelete={() => onDocDelete(doc.id, user.id)}
      listView={listView}
      filter={filter}
      updateDocPrivacy={updateDocPrivacy}
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
      {filter === 'Groups'
        ?
        <a
          onClick={() => showMembers(group.selected)}
        >
          Members
        </a>
        : null
      }
      <ul className="list-group">
        {docList}
      </ul>
    </div>
  );
};

DocList.propTypes = {
  user: PropTypes.object.isRequired,
  docs: PropTypes.array.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
  switchView: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  showMembers: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  updateDocPrivacy: PropTypes.func.isRequired,
};

export default DocList;
