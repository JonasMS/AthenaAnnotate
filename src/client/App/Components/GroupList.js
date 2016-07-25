import React, { PropTypes } from 'react';

const GroupList = ({ user, leaveGroupDB, setGroup, createNewGroup, setFilter, group }) => {
  const groups = group.groups.map(groupObj => (
    <li key={groupObj.id}>
      <a
        className="nav-header"
        data-target="#groups"
        onClick={() => {
          setGroup(groupObj.id);
          setFilter('Groups');
        }}
      >
        {groupObj.name}
      </a>
    </li>
  ));
  return (
    <ul className="nav nav-list" id="groups">
      {groups}
      <li key="00">
        <a
          className="nav-header"
          data-target="#groups"
          onClick={() => createNewGroup()}
        >
          + Create a new Group
        </a>
      </li>
    </ul>
  );
};

GroupList.propTypes = {
  user: PropTypes.object,
  leaveGroupDB: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  group: PropTypes.object,
  createNewGroup: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default GroupList;

// <button onClick={() => leaveGroupDB(groupObj.id, user.id)}>
//   X
// </button>
