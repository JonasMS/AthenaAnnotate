export const loadDocs = (dispatch, filter) => {
  // filter will determine which set of docs to load
  // options will be following feed or personal feed

  dispatch({ type: 'LOADING', loading: true });
  // DB query here to get articles
  // assume this next line is the results from DB call, and there was some function
  // that organized it into the structure we need for the state
  const docs = [
    {
      id: 0,
      url: 'http://www.google.com',
      title: 'Some Title',
    },
    {
      id: 1,
      url: 'http://www.yahoo.com',
      title: 'Some Other Title',
    },
  ];

  const annotations = [
    {
      id: 0,
      target: 'This is some text from the article',
      body: 'Some text here',
      edit: false,
      doc_id: 0,
    },
    {
      id: 1,
      target: 'This is some more text from the article',
      body: 'Some other text here',
      edit: false,
      doc_id: 0,
    },
    {
      id: 2,
      target: 'This is some other text from the article',
      body: 'Some more text here',
      edit: false,
      doc_id: 1,
    },
    {
      id: 3,
      target: 'This is some more other text from the article',
      body: 'Some other more text here',
      edit: false,
      doc_id: 1,
    },
  ];
  dispatch({ type: 'LOAD_DOC', docs });
  dispatch({ type: 'LOAD_ANNOTATION', annotations });
  dispatch({ type: 'LOADING', loading: false });
};

export const deleteAnnotation = (id) => (
  {
    type: 'DELETE_ANNOTATION',
    id,
  }
);

export const editAnnotation = (id) => (
  {
    type: 'EDIT_ANNOTATION',
    id,
  }
);

export const editText = (body) => (
  {
    type: 'EDIT_TEXT',
    body,
  }
);

export const saveEdit = (id, body) => (
  {
    type: 'SAVE_EDIT',
    id,
    body,
  }
);

export const deleteBody = (id) => (
  {
    type: 'DELETE_BODY',
    id,
  }
);

export const deleteDoc = (id) => (
  {
    type: 'DELETE_DOC',
    id,
  }
);
