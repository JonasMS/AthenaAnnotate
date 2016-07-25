import { connect } from 'react-redux';
import AnnotationList from '../Components/AnnotationList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    annotations: state.annotations,
    filter: state.filter,
    user: state.user,
    following: state.following,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onAnnotationDelete: (id, url) => {
      dispatch(actions.deleteAnnotationDB(id, url));
    },
    onEditBody: (id) => {
      dispatch(actions.editAnnotation(id));
    },
    onSaveEdit: (id, text, privacy, group, url) => {
      dispatch(actions.editAnnotationDB(id, text, privacy, group, url));
    },
    onDeleteBody: (id, url) => {
      dispatch(actions.deleteBodyDB(id, url));
    },
    followUser: (userId, id) => {
      dispatch(actions.followUser(userId, id));
    },
    setFilter: (filter) => {
      dispatch(actions.setFilter(filter));
    },
    setUserDB: (userId) => {
      dispatch(actions.setUserDB(userId));
    },
  }
);

const VisibleAnnotationList = connect(
  mapStatetoProps,
  mapDispatchToProps
)(AnnotationList);

export default VisibleAnnotationList;
