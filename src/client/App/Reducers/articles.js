const article = (state, action) => {
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return {
        id: state.id,
        url: state.url,
      };
    default:
      return state;
  }
};

const articles = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return action.articles.map(a =>
        article(a, action)
      );
    default:
      return state;
  }
};

export default articles;
