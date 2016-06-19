import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './App/Reducers';
import Application from './App/Containers/Application';

const initialState = {
  articles: [],
  //   {
  //     id: 0,
  //     url: 'http://www.google.com',
  //   },
  //   {
  //     id: 1,
  //     url: 'http://www.yahoo.com',
  //   },
  // ],
  notes: [],
  //   {
  //     id: 0,
  //     text: 'This is some text from the article',
  //     note: 'Some text here',
  //     edit: false,
  //     article_id: 0,
  //   },
  //   {
  //     id: 1,
  //     text: 'This is some more text from the article',
  //     note: 'Some other text here',
  //     edit: false,
  //     article_id: 0,
  //   },
  //   {
  //     id: 2,
  //     text: 'This is some other text from the article',
  //     note: 'Some more text here',
  //     edit: false,
  //     article_id: 1,
  //   },
  //   {
  //     id: 3,
  //     text: 'This is some more other text from the article',
  //     note: 'Some other more text here',
  //     edit: false,
  //     article_id: 1,
  //   },
  // ],
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
