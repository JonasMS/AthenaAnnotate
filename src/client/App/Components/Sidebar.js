import React, { PropTypes } from 'react';
import FacebookLogout from '../../../libs/athena/src/components/FacebookLogout';

const Sidebar = ({ logout, setFilter }) => (
  <div className="col s2 offset-s2">
    <ul>
      <li>
        <a onClick={() => setFilter('Self')}>My Annotations</a>
      </li>
      <li>
        <a onClick={() => setFilter('Discover')}>Discover</a>
      </li>
      <li>
        <a>Following</a>
      </li>
      <li>
        <a>Groups</a>
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
};

export default Sidebar;
