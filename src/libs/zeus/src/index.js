import './assets/styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { IFRAME_CLASS, HIDE_IFRAME_CLASS } from './constants';

const protocol = document.location.protocol;
const host = process.env.ATHENA_HOST;
const port = protocol.toUpperCase() === 'HTTP:'
           ? process.env.HTTP_PORT
           : process.env.HTTPS_PORT;

const app = document.createElement('div');
app.id = 'app-anchor';

const iframe = document.createElement('iframe');
iframe.src = `${protocol}//${host}:${port}/athena/athena.html`;
iframe.id = 'athena-app';
iframe.classList.add(HIDE_IFRAME_CLASS);
iframe.classList.add(IFRAME_CLASS);

document.body.appendChild(iframe);
document.body.insertBefore(app, document.body.childNodes[0]);

render(
  <App iframe={iframe} />,
  document.getElementById('app-anchor')
);
