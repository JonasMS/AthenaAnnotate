import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// the element that will hold this react app
const app = document.createElement('div');
app.id = 'app-anchor';

// the frame that will load in athena.html,
// which will load in the react app athena.js
const iframe = document.createElement('iframe');
iframe.src = `${process.env.ATHENA_HOST}/athena/athena.html`;
iframe.id = 'athena-app';
iframe.style = [
  'position: absolute;',
  'top: 0;',
  'right: 0px;',
  'width: 300px;',
  'height: 150px;',
  'border: none;',
  'transitionDuration: 0.5s',
  'display: none',
].join('');

// document is the site the user is visiting. here we inject our code.
// @TODO: what if body doesn't exist?
document.body.appendChild(iframe);
document.body.insertBefore(app, document.body.childNodes[0]);

render(
  <App />,
  document.getElementById('app-anchor')
);
