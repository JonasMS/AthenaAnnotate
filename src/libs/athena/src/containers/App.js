import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import App from '../components/App';

const mapStateToProps = (state) => ({
  user: state.user,
  panel: state.panel,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
