export const goTo = (url) => {
  window.location = url;
};

export const loadArticle = (article) => {
  return {
    type: 'LOAD_ARTICLE',
    id: article.id,
    notes: article.notes,
    url: article.url,
  };
};

export const deleteNote = (id) => {
  return {
    type: 'DELETE_NOTE',
    id,
  };
};

export const editNote = (id) => {
  return {
    type: 'EDIT_NOTE',
    id,
  };
};

export const editText = (id, text) => {
  return {
    type: 'EDIT_TEXT',
    id,
    text,
  };
};
