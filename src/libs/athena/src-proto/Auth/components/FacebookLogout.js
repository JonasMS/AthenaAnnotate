import React from 'react';

export class FacebookLogout extends React.Component {
  constructor(props) {
    super(props);
    this.didClickFacebookLogoutButton = this.didClickFacebookLogoutButton.bind(this);
  }

  didClickFacebookLogoutButton() {
    this.props.logout();
  }

  render() {
    return (
      <button ref="logoutButton" onClick={this.didClickFacebookLogoutButton}>
        Log Out of Facebook
      </button>
    );
  }
}

FacebookLogout.propTypes = {
  logout: React.PropTypes.func.isRequired,
};
