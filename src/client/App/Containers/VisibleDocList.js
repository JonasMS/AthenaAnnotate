import { connect } from 'react-redux';
import DocList from '../Components/DocList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    docs: state.docs,
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
    editText: (id, note) => {
      dispatch(actions.editText(id, note));
    },
  }
);

const VisibleDocList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(DocList);

export default VisibleDocList;
