export const loadArticles = (dispatch) => {
  dispatch({ type: 'LOADING', loading: true });
  // DB query here to get articles
  // assume this next line is the results from DB call, and there was some function
  // that organized it into the structure we need for the state
  const articles = [
    {
      id: 0,
      url: 'http://www.google.com',
    },
    {
      id: 1,
      url: 'http://www.yahoo.com',
    },
  ];

  const notes = [
    {
      id: 0,
      text: 'This is some text from the article',
      note: 'Some text here',
      edit: false,
      article_id: 0,
    },
    {
      id: 1,
      text: 'This is some more text from the article',
      note: 'Some other text here',
      edit: false,
      article_id: 0,
    },
    {
      id: 2,
      text: 'This is some other text from the article',
      note: 'Some more text here',
      edit: false,
      article_id: 1,
    },
    {
      id: 3,
      text: 'This is some more other text from the article',
      note: 'Some other more text here',
      edit: false,
      article_id: 1,
    },
  ];
  dispatch({ type: 'LOAD_ARTICLE', articles });
  dispatch({ type: 'LOAD_NOTE', notes });
  dispatch({ tpye: 'LOADING', loading: false });
};

export const deleteNote = (id) => (
  {
    type: 'DELETE_NOTE',
    id,
  }
);

export const editNote = (id) => (
  {
    type: 'EDIT_NOTE',
    id,
  }
);

export const editText = (text) => (
  {
    type: 'EDIT_TEXT',
    text,
  }
);

export const saveEdit = (id, text) => (
  {
    type: 'SAVE_EDIT',
    id,
    text,
  }
);
