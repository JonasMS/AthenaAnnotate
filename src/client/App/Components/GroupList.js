import React, { PropTypes } from 'react';

const GroupList = ({ user, leaveGroupDB, setGroup, createGroup, editGroup, setFilter, group }) => {
  const groups = group.groups.map(groupObj => (
    <li key={groupObj.id}>
      <a
        className="nav-header"
        data-toggle="collapse"
        data-target="#groups"
        onClick={() => {
          setGroup(groupObj.id);
          setFilter('Groups');
        }}
      >
        {groupObj.name}
        <button onClick={() => leaveGroupDB(groupObj.id, user.id)}>
          X
        </button>
      </a>
    </li>
  ));
  return (
    <ul className="nav nav-list collpase" id="groups">
      {groups}
      <input
        className="nav-header"
        placeholder="Group Name"
        defaultValue={group.edit}
        onChange={(e) => {
          e.preventDefault();
          editGroup(e.target.value);
        }}
      />
      <button
        onClick={() => {
          createGroup(group.edit, user.id);
        }}
      >
        Create!
      </button>
    </ul>
  );
};

GroupList.propTypes = {
  user: PropTypes.object,
  leaveGroupDB: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  group: PropTypes.object,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default GroupList;
