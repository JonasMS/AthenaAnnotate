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
              }
            });
        }
      });
  }

  componentDidUpdate() {
    // this.props.actions.fetchDocs(this.props.user.id);
    this.props.actions.fetchAnnotations(
      this.props.user.id,
      this.props.filter,
      this.props.group.selected
    );
    if (!this.props.following.loaded) {
      this.props.actions.loadFollowingDB(this.props.user.id);
    }
    if (!this.props.group.loaded) {
      this.props.actions.loadGroupsDB(this.props.user.id);
    }
    // this.props.actions.fetchStuff(this.props.user.id);
  }

  render() {
    const {
      user,
      loading,
      filter,
      group,
      actions: {
        login,
        logout,
        setFilter,
        setGroup,
        leaveGroup,
        showGroups,
        createGroup,
      },
    } = this.props;
    return (
      <div>
        <div id="fb-root"></div>
        {
          user && user.id
          ?
            <div className="row">
              <Sidebar
                user={user}
                logout={logout}
                setFilter={setFilter}
                filter={filter}
                group={group}
                leaveGroup={leaveGroup}
                setGroup={setGroup}
                showGroups={showGroups}
                createGroup={createGroup}
              />
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
  filter: PropTypes.string,
  following: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

export default App;
