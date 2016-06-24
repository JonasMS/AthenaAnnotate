import { connect } from 'react-redux';
import AnnotationList from '../Components/AnnotationList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    annotations: state.annotations,
    filter: state.filter,
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
    onSaveEdit: (id, text, url) => {
      dispatch(actions.editAnnotationDB(id, text, url));
    },
    onDeleteBody: (id, url) => {
      dispatch(actions.deleteBodyDB(id, url));
    },
  }
);

const VisibleAnnotationList = connect(
  mapStatetoProps,
  mapDispatchToProps
)(AnnotationList);

export default VisibleAnnotationList;
