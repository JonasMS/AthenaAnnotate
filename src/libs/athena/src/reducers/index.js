import { combineReducers } from 'redux';
import adder from './adder';
import annotation from './annotation';
import annotations from './annotations';
import widget from './widget';
import user from './user';
import error from './error';

export default combineReducers({
  user,
  adder,
  widget,
  annotation,
  annotations,
  error,
});
