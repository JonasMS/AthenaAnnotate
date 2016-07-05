import './assets/styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { IFRAME_CLASS, HIDE_IFRAME_CLASS } from './constants';

let protocol;
let host;
let port;
let baseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = `HTTPS:${process.env.ATHENA_HOST}:${process.env.HTTPS_PORT}`;
} else {
  protocol = document.location.protocol;
  host = process.env.ATHENA_HOST;
  port = protocol.toUpperCase() === 'HTTP:'
       ? process.env.HTTP_PORT
       : process.env.HTTPS_PORT;
  baseUrl = `${protocol}//${host}:${port}`;
}

const app = document.createElement('div');
app.id = 'app-anchor';

const iframe = document.createElement('iframe');
iframe.src = `${baseUrl}/athena/athena.html`;
iframe.id = 'athena-app';
iframe.classList.add(HIDE_IFRAME_CLASS);
iframe.classList.add(IFRAME_CLASS);

document.body.appendChild(iframe);
document.body.insertBefore(app, document.body.childNodes[0]);

render(
  <App iframe={iframe} />,
  document.getElementById('app-anchor')
);

// export default iframe;
