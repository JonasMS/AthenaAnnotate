import React, { PropTypes } from 'react';
// import FacebookLogout from '../../../libs/athena/src/components/FacebookLogout';
// import GroupList from './GroupList';

const NavBar = ({
  logout,
  user,
  loadProfile,
}) => {
  const style = { backgroundImage: 'url(https://scontent-sjc.xx.fbcdn.net/v/t1.0-9/10401204_668568875459_8134_n.jpg?oh=9a5c5c13fe2f541352c061ac355a15fb&oe=580BE24C)' };
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
                <div className="avatar" style={style} />
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
