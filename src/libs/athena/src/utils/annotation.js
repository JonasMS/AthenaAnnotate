import fetch from 'isomorphic-fetch';
// import babel-polyfill
require('es6-promise').polyfill();

export const createAnnotation = () => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const url = window.location.href;
};

export const saveAnnote = (
  annotation
) => {
  console.log(annotation);
  fetch('http://localhost:3000/api/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(annotation),
  })
  .then(res => {
    if (res.status >= 400) {
      throw new Error(
        'bad response on create'
      );
    }
  });
};
// modifyAnnotation
// getAnnotationIdx
// modifyAnnotation
