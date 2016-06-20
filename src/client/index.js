import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './App/Reducers';
import Application from './App/Containers/Application';

const initialState = {
  user: {},
  docs: [],
  annotations: [],
  editor: '',
  loading: false,
};

let store = createStore(Reducers, initialState);

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('app')
);
