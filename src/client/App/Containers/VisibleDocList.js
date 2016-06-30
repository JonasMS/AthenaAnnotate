import { connect } from 'react-redux';
import DocList from '../Components/DocList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    docs: state.docs,
    listView: state.listView,
    filter: state.filter,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onDocDelete: (id) => {
      dispatch(actions.deleteDoc(id));
    },
    switchView: () => {
      dispatch(actions.switchView());
    },
  }
);

const VisibleDocList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(DocList);

export default VisibleDocList;
