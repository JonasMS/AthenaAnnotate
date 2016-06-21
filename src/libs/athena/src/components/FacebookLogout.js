import React from 'react';

class FacebookLogout extends React.Component {
  render() {
    return (
      <button ref="logoutButton" onClick={this.props.logout}>
        Log Out of Facebook
      </button>
    );
  }
}

FacebookLogout.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

export default FacebookLogout;
