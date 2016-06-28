import React, { PropTypes } from 'react';
// import FacebookLogout from '../../../libs/athena/src/components/FacebookLogout';
import GroupList from './GroupList';

const Sidebar = ({
  user,
  // logout,
  setFilter,
  showGroups,
  leaveGroupDB,
  setGroup,
  group,
  createGroup,
  editGroup,
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
          />
          :
          null
        }
      </li>
      <li>
        <a>Settings</a>
      </li>
      <li>
        <a>Help</a>
      </li>
    </ul>
  </div>
);


Sidebar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  showGroups: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  leaveGroupDB: PropTypes.func.isRequired,
  group: PropTypes.object,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
};

export default Sidebar;

/*  <li>
      <FacebookLogout logout={logout} />
    </li> */
