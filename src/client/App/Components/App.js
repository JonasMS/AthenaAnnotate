import React, { Component, PropTypes } from 'react';
import Loading from './Loading';
import Sidebar from './Sidebar';
import Splash from './Splash';
import VisibleDocList from '../Containers/VisibleDocList';
import { initFB, getUserFromFB, getUserStatusFromFB } from '../../../libs/common/auth';

class App extends Component {
  componentDidMount() {
    initFB()
      .then(() => getUserStatusFromFB())
      .then(status => {
        if (status === 'connected') {
          getUserFromFB()
            .then(user => {
              if (user) {
                this.props.actions.getUserFromDB(user);
                this.props.actions.loadDocs(this.props.user);
              }
            });
        }
      });
  }

  render() {
    const { user, loading, actions: { login, logout } } = this.props;
    return (
      <div>
        <div id="fb-root"></div>
        {
          user && user.id
          ?
            <div className="row">
              <Sidebar user={user} logout={logout} />
              {loading ? <Loading /> : <VisibleDocList />}
            </div>
          :
            <Splash login={login} />
        }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default App;
