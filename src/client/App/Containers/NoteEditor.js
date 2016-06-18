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
    editText: (text) => {
      dispatch(actions.editText(text));
    },
  }
);

const NoteEditor = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Editor);

export default NoteEditor;
