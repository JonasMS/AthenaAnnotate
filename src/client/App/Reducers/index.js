import { combineReducers } from 'redux';
// import notes from './notes';
import articles from './articles';

const ArticlesApp = combineReducers({
  articles,
  // notes,
});

export default ArticlesApp;
