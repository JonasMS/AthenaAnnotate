export const goTo = (url) => {
  window.location = url;
};

export const loadArticle = (article) => (
  {
    type: 'LOAD_ARTICLE',
    id: article.id,
    notes: article.notes,
    url: article.url,
  }
);

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
