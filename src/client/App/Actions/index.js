require('isomorphic-fetch');
require('es6-promise').polyfill();

export * from '../../../libs/athena/src/actions';

// TODO
// pass a `filter` will determine which set of docs to
// load options will be following feed or personal feed

// Functions for loading documents and annotations
// const requestDocs = () => (
//   {
//     type: 'REQUEST_DOCS',
//   }
// );

// const loadDocs = (docs) => (
//   {
//     type: 'LOAD_DOCS',
//     docs,
//   }
// );

// export const fetchDocs = (id) => (
//   dispatch => {
//     dispatch(requestDocs());
//     return fetch(`http://localhost:3000/api/docs?UserId=${id}`)
//       .then(response => response.json())
//       .then(docs => dispatch(loadDocs(docs)))
//       .catch(err => console.log(err));
//   }
// );

const requestAnnotations = () => (
  {
    type: 'REQUEST_ANNOTATIONS',
  }
);

const loadAnnotations = (annotations) => (
  {
    type: 'LOAD_ANNOTATIONS',
    annotations,
  }
);

export const fetchAnnotations = (id) => (
  dispatch => {
    dispatch(requestAnnotations());
    return fetch(`http://localhost:3000/api/annotations?UserId=${id}`)
      .then(response => response.json())
      .then(annotations => {
        dispatch(loadAnnotations(annotations));
      // .catch(err => console.log(err));
      });
  }
);

// To handle deletion of annotations
export const deleteAnnotation = id => (
  {
    type: 'DELETE_ANNOTATION',
    id,
  }
);

const deleteAnnotationFail = id => (
  {
    type: 'DELETE_ANNOTATION_FAIL',
    id,
  }
);

export const deleteAnnotationDB = (id, url) => (
  dispatch =>
    fetch(`http://localhost:3000/api/annotations?id=${url}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(deleteAnnotation(id));
        }
        return dispatch(deleteAnnotationFail(id));
      })
);

// To handle editing of text within the annotation editor
export const editText = body => (
  {
    type: 'EDIT_TEXT',
    body,
  }
);

// To handle editing of an annotation
export const editAnnotation = id => (
  {
    type: 'EDIT_ANNOTATION',
    id,
  }
);

const saveEdit = (id, body) => (
  {
    type: 'SAVE_EDIT',
    id,
    body,
  }
);

const saveEditFail = id => (
  {
    type: 'SAVE_EDIT_FAIL',
    id,
  }
);

export const editAnnotationDB = (id, body, url) => (
  dispatch =>
    fetch('http://localhost:3000/api/annotations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: {
          text: body,
        },
        id: url,
      }),
    })
      .then(response => response.json())
      .then(annotation => {
        if (Array.isArray(annotation)) {
          return dispatch(saveEdit(id, body));
        }
        return dispatch(saveEditFail(id));
      })
);

// To handle deletion of annotations from the DB
const deleteBody = id => (
  {
    type: 'DELETE_BODY',
    id,
  }
);

const deleteBodyFail = id => (
  {
    type: 'DELETE_BODY_FAIL',
    id,
  }
);

export const deleteBodyDB = (id, url) => (
  dispatch =>
    fetch('http://localhost:3000/api/annotations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: { text: null },
        id: url,
      }),
    })
      .then(response => response.json())
      .then(message => {
        if (Array.isArray(message)/* deleted */) {
          return dispatch(deleteBody(id));
        }
        return dispatch(deleteBodyFail(id));
      })

);

// To handle deletion of doc for a specific user
export const deleteDoc = id => (
  {
    type: 'DELETE_DOC',
    id,
  }
);

// To handle switching between list and detail card views
export const switchView = () => (
  {
    type: 'SWITCH_VIEW',
  }
);
