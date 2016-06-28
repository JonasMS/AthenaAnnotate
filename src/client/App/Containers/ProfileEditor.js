import { connect } from 'react-redux';
import Profile from '../Components/Profile';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    show: state.profile,
    user: state.user,

  }
);

const mapDispatchToProps = (dispatch) => (
  {
    exitProfile: () => {
      dispatch(actions.exitProfile());
    },
  }
);

const ProfileEditor = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Profile);

export default ProfileEditor;
