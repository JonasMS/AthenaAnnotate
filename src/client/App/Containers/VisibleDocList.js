import { connect } from 'react-redux';
import DocList from '../Components/DocList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    user: state.user,
    docs: state.docs,
    listView: state.listView,
    filter: state.filter,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onDocDelete: (id, userId) => {
      dispatch(actions.deleteDocDB(id, userId));
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
