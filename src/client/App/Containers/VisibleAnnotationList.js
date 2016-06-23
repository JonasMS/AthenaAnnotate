import { connect } from 'react-redux';
import AnnotationList from '../Components/AnnotationList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    annotations: state.annotations,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onAnnotationDelete: (id) => {
      dispatch(actions.deleteAnnotation(id));
    },
    onEditBody: (id) => {
      dispatch(actions.editAnnotation(id));
    },
    onSaveEdit: (id, text) => {
      dispatch(actions.saveEdit(id, text));
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
