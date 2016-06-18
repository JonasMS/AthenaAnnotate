const article = (state, action) => {
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return {
        id: action.id,
        url: action.url,
      };
    default:
      return state;
  }
};

const articles = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return state.map(a =>
        article(a, action)
      );
    default:
      return state;
  }
};

export default articles;
