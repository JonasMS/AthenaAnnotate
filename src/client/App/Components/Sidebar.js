import React, { PropTypes } from 'react';
import GroupList from './GroupList';

const Sidebar = ({
  user,
  setFilter,
  showGroups,
  leaveGroupDB,
  setGroup,
  group,
  createGroup,
  editGroup,
  createNewGroup,
}) => (
  <div className="col-md-3">
    <ul className="nav nav-sidebar affix">
      <li>
        <a onClick={() => setFilter('Self')}>My Annotations</a>
      </li>
      <li>
        <a onClick={() => setFilter('Discover')}>Discover</a>
      </li>
      <li>
        <a onClick={() => setFilter('Following')}>Following</a>
      </li>
      <li>
        <a onClick={() => showGroups()}>Groups</a>
        {group.showGroups
          ?
          <GroupList
            user={user}
            group={group}
            leaveGroupDB={leaveGroupDB}
            setGroup={setGroup}
            createGroup={createGroup}
            editGroup={editGroup}
            setFilter={setFilter}
            createNewGroup={createNewGroup}
          />
          :
          null
        }
      </li>
      <li>
        <a>Help</a>
      </li>
    </ul>
  </div>
);


Sidebar.propTypes = {
  user: PropTypes.object,
  setFilter: PropTypes.func.isRequired,
  showGroups: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  leaveGroupDB: PropTypes.func.isRequired,
  group: PropTypes.object,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  createNewGroup: PropTypes.func.isRequired,
};

export default Sidebar;

/*  <li>
      <a>Settings</a>
    </li>
 */
