import { connect } from 'react-redux';
import NoteList from '../Components/NoteList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    notes: state.notes,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onNoteDelete: (id) => {
      dispatch(actions.deleteNote(id));
    },
    onNoteEdit: (id) => {
      dispatch(actions.editNote(id));
    },
    onSaveEdit: (id, text) => {
      dispatch(actions.saveEdit(id, text));
    },
  }
);

const VisibleNoteList = connect(
  mapStatetoProps,
  mapDispatchToProps
)(NoteList);

export default VisibleNoteList;
