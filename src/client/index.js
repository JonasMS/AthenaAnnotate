import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ArticlesApp from './App/Reducers';
// import * as App from './App';
import App from './App/Components/App';

const fakeArticles = [
  {
    id: 0,
    url: 'http://www.google.com',
    notes: [
      {
        id: 0,
        text: 'Some text here',
      },
      {
        id: 1,
        text: 'Some other text here',
      },
    ],
  },
  {
    id: 1,
    url: 'http://www.yahoo.com',
    notes: [
      {
        id: 2,
        text: 'Some more text here',
      },
      {
        id: 3,
        text: 'Some other more text here',
      },
    ],
  },
];

let store = createStore(ArticlesApp, { articles: fakeArticles });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
