import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import { checkStatus, createPOST, parseJSON } from './fetch';
import * as options from '../constants/fetchOptions';

export const saveAnnote = (annote) => {
  fetch(
    options.API_CREATE,
    createPOST(annote)
    )
    .then(checkStatus);
};

export const fetchUser = (fbAcc) => {
  const payload = JSON.stringify(fbAcc);

  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Content-length': payload.length,
    },
    credentials: 'same-origin',
    body: payload,
  })
    .then(checkStatus)
    .then(res => res.json()); // TODO: refactor with parseJSON
    // .then(user => { this.user = user; });
};

export const fetchAnnotes = (user) => {
  const source = window.location.href;
  const query = '/api/doc?UserId=' + user.id + '&&source=' + source;

  return fetch(query)
    .then(res => res.json());
};
