import { connect } from 'react-redux';
import DocList from '../Components/DocList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    user: state.user,
    docs: state.docs,
    listView: state.listView,
    filter: state.filter,
    group: state.group,
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
    showMembers: (groupId) => {
      dispatch(actions.showMembers(groupId));
    },
  }
);

const VisibleDocList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(DocList);

export default VisibleDocList;
