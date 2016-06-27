import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import App from '../components/App';

const mapStateToProps = (state) => ({
  user: state.user,
  panel: state.panel,
  // annotation: state.annotation,
  // annotations: state.annotations,
  // widget: state.widget,
  // adder: state.adder,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
