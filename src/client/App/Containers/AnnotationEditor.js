import { connect } from 'react-redux';
import Editor from '../Components/Editor';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    editor: state.editor,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    editText: (body) => {
      dispatch(actions.editText(body));
    },
  }
);

const AnnotationEditor = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Editor);

export default AnnotationEditor;
