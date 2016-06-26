import { combineReducers } from 'redux';
import user from './user';
import panel from './panel';
import error from './error';
import adder from './adder';
import widget from './widget';
import annotation from './annotation';
import annotations from './annotations';

export default combineReducers({
  user,
  panel,
  adder,
  widget,
  annotation,
  annotations,
  error,
});
