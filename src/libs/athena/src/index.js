import './assets/styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';

const initialState = {
  user: {},
};

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('athena')
);

window.store =   store;
