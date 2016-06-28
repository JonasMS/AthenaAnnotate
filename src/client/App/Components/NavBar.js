import React, { PropTypes } from 'react';
// import FacebookLogout from '../../../libs/athena/src/components/FacebookLogout';
// import GroupList from './GroupList';

const NavBar = ({
  logout,
  user,
  showModal,
  setModal,
}) => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Athena</a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.facebook.name}
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setModal('profile');
                    showModal();
                  }}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);


NavBar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default NavBar;
