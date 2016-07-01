import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../Components/App';
import * as actions from '../Actions';

const mapStateToProps = ({ user, loading, filter, following, group, profile, modal, invites }) => (
  {
    user,
    loading,
    filter,
    following,
    group,
    profile,
    modal,
    invites,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(actions, dispatch),
  }
);

const Application = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Application;
