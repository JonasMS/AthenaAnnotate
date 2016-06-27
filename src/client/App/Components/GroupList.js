import React, { PropTypes } from 'react';

const GroupList = ({ leaveGroup, setGroup, group }) => {
  const groups = group.groups.map(groupObj => (
    <li
      onClick={() => setGroup(groupObj.id)}
    >
      {groupObj.users.name}
      <button onClick={() => leaveGroup(groupObj.id)}>
        X
      </button>
    </li>
  ));
  return (
    <ul>
      {groups}
    </ul>
  );
};

GroupList.propTypes = {
  leaveGroup: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  group: PropTypes.object,
};

export default GroupList;
