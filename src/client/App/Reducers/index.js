import { combineReducers } from 'redux';
import notes from './notes';
import articles from './articles';
import editor from './editor';
import loading from './loading';

const Reducers = combineReducers({
  articles,
  notes,
  editor,
  loading,
});

export default Reducers;
