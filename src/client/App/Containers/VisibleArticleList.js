import { connect } from 'react-redux';
import ArticleList from '../Components/ArticleList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNoteDelete: (id) => {
      // window.console.log('something was clicked');
      // window.console.log(actions.deleteNote);
      dispatch(actions.deleteNote(id));
    },
    onNoteEdit: (id) => {
      dispatch(actions.editNote(id));
    },
  };
};

const VisibleArticleList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(ArticleList);

export default VisibleArticleList;
