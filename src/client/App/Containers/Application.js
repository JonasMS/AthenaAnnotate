import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../Components/App';
import * as actions from '../Actions';

const mapStateToProps = ({ user, loading }) => (
  {
    user,
    loading,
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
