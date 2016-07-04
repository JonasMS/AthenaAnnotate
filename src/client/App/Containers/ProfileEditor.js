import { connect } from 'react-redux';
import Profile from '../Components/Profile';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    show: state.profile,
    user: state.user,
    invites: state.invites,
    group: state.group,
    following: state.following,

  }
);

const mapDispatchToProps = (dispatch) => (
  {
    exitProfile: () => {
      dispatch(actions.exitProfile());
    },
    acceptInvite: (group, user, bool) => {
      dispatch(actions.acceptInvite(group, user, bool));
    },
    setGroup: (groupId) => {
      dispatch(actions.setGroup(groupId));
    },
    setFilter: (filter) => {
      dispatch(actions.setFilter(filter));
    },
    setUser: (userId) => {
      dispatch(actions.setUser(userId));
    },
  }
);

const ProfileEditor = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Profile);

export default ProfileEditor;
