import { combineReducers } from 'redux';
import annotations from './annotations';
import docs from './docs';
import editor from './editor';
import loading from './loading';

const Reducers = combineReducers({
  docs,
  annotations,
  editor,
  loading,
});

export default Reducers;
