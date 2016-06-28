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
    // .then(parseJSON)
    // .then(annotation => {


    // dispatch(addAnnote(annotation));
    // dispatch(clearAnnote());
    // });
};
