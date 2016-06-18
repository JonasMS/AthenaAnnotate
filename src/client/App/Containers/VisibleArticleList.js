import { connect } from 'react-redux';
import ArticleList from '../Components/ArticleList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    articles: state.articles,
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
    editText: (id, note) => {
      dispatch(actions.editText(id, note));
    },
  }
);

const VisibleArticleList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(ArticleList);

export default VisibleArticleList;
