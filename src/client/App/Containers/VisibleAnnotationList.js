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
    onAnnotationEdit: (id) => {
      dispatch(actions.editAnnotation(id));
    },
    onSaveEdit: (id, text) => {
      dispatch(actions.saveEdit(id, text));
    },
  }
);

const VisibleAnnotationList = connect(
  mapStatetoProps,
  mapDispatchToProps
)(AnnotationList);

export default VisibleAnnotationList;
