import { combineReducers } from 'redux';
import notes from './notes';
import articles from './articles';
import editor from './editor';

const Reducers = combineReducers({
  articles,
  notes,
  editor,
});

export default Reducers;
