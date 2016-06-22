import fetch from 'isomorphic-fetch';
// import babel-polyfill
require('es6-promise').polyfill();

const createAnnote = ({
  annotation,
  annotations,
  user,
}) => {
  const url = window.location.href;
  const annoteId =
  'annote' + annotations.length + '/';
  const {
    exact,
    prefix,
    suffix,
  } = annotation.target;

  return Object.assign({}, annotation, {
    id: url + annoteId + user.id,
    createdAt: Date.now(),
    creator: user.id,
    target: {
      source: url,
      selector: {
        exact,
        prefix,
        suffix,
      },
    },
  });
};

export const saveAnnote = (data) => {
  // create full annotation
  const annotation = createAnnote(data);

  // console.log(annotation);

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
    } else {
      // TODO: update annotations
    }
  });
  return annotation;
};
// modifyAnnotation
// getAnnotationIdx
// modifyAnnotation
