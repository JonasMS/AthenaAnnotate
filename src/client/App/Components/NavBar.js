import React, { PropTypes } from 'react';
// import FacebookLogout from '../../../libs/athena/src/components/FacebookLogout';
// import GroupList from './GroupList';

const NavBar = ({
  logout,
  user,
  loadProfile,
}) => {
  const style = { backgroundImage: `url(${user.facebook.picture})` };
  return (
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
                <div className="circle avatar" style={style} />
                {user.facebook.name}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    href="#"
                    onClick={() => loadProfile()}
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
};


NavBar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,

};

export default NavBar;
