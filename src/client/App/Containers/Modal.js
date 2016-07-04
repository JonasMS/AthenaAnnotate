import { connect } from 'react-redux';
import Modal from '../Components/Modal';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    group: state.group,
    user: state.user,
    modal: state.modal,
    search: state.search,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    showModal: () => {
      dispatch(actions.showModal());
    },
    createGroup: (name, userId, userName, otherUsersArray) => {
      dispatch(actions.createGroup(name, userId, userName, otherUsersArray));
    },
    editGroup: (edit) => {
      dispatch(actions.editGroup(edit));
    },
    searchUsers: (query, id) => {
      dispatch(actions.searchUsers(query, id));
    },
    selectUser: (name) => {
      dispatch(actions.selectUser(name));
    },
    deselectUser: (name) => {
      dispatch(actions.deselectUser(name));
    },
  }
);

const GroupModal = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Modal);

export default GroupModal;
