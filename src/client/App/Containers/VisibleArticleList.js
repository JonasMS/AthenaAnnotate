import { connect } from 'react-redux';
import ArticleList from '../Components/ArticleList';
import * as actions from '../Actions';

const fakeArticles = [
  {
    id: 0,
    url: 'http://www.google.com',
    notes: [
      {
        id: 0,
        text: 'Some text here',
      },
      {
        id: 1,
        text: 'Some other text here',
      },
    ],
  },
  {
    id: 1,
    url: 'http://www.yahoo.com',
    notes: [
      {
        id: 0,
        text: 'Some more text here',
      },
      {
        id: 1,
        text: 'Some other more text here',
      },
    ],
  },
];

const mapStatetoProps = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNoteClick: (id) => {
      window.console.log('something was clicked');
      window.console.log(actions.deleteNote);
      dispatch(actions.deleteNote(id));
    },
  };
};

const VisibleArticleList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(ArticleList);

export default VisibleArticleList;
