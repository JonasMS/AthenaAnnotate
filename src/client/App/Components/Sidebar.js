import React, { PropTypes } from 'react';
import FacebookLogout from '../../../libs/athena/src/components/FacebookLogout';
import GroupList from './GroupList';

const Sidebar = ({ user, logout, setFilter, showGroups, leaveGroup, setGroup, group, createGroup }) => (
  <div className="col s2 offset-s2">
    <ul>
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
        <input
          placeholder="Group Name"
        />
        <button onClick={() => createGroup('GroupName', user.id)}>
          Create!
        </button>
        {group.showGroups
          ?
          <GroupList
            group={group}
            leaveGroup={leaveGroup}
            setGroup={setGroup}
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
    <FacebookLogout logout={logout} />
  </div>
);


Sidebar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  showGroups: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  leaveGroup: PropTypes.func.isRequired,
  group: PropTypes.object,
  createGroup: PropTypes.func.isRequired,
};

export default Sidebar;
