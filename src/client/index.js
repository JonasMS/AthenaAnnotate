import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Application from './App/Containers/Application';
import configureStore from './App/Store';
import './style.css';

let store = configureStore();

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('app')
);

window.store = store;
