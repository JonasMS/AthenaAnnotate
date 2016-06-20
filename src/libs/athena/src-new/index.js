// import 'babel-polyfill'
import './assets/styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store';
// import { getLoginStatus } from './actions';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('athena')
);

// we need to get user. i can init FB. i can get query for login status.
// then what? dispatch an action to the store with the user data.
// store.dispatch(getLoginStatus());

// if we have a user, we need to get annotations (if they exist for this user, for this site).
