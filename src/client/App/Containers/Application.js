import { connect } from 'react-redux';
import App from '../Components/App';
import * as actions from '../Actions';

const mapStateToProps = (state) => (
  {
    loading: state.loading,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    loadDocs: (filter) => {
      actions.loadDocs(dispatch, filter);
    },
  }
);

const Application = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Application;
