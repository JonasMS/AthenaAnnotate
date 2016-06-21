import './assets/styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';

const store = configureStore({
  annotation: {
    body: {
      lastModified: '',
      text: '',
    },
    target: {
      exact: '',
      prefix: '',
      suffix: '',
    },
  },
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('athena')
);

window.store = store; // for dev purposes

// we need to get user. i can init FB. i can get query for login status.
// then what? dispatch an action to the store with the user data.
// store.dispatch(getLoginStatus());

// if we have a user, we need to get annotations (if they exist for this user, for this site).
