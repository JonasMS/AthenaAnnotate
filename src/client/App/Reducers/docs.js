const doc = (state, action) => {
  switch (action.type) {
    case 'LOAD_DOCS':
      return {
        id: state.id,
        url: state.url,
        image: state.image,
        title: state.title,
      };
    case 'DELETE_DOC':
      if (action.id !== state.id) {
        return true;
      }
      return false;
    default:
      return state;
  }
};

const docs = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DOCS':
      return action.docs.map(a =>
        doc(a, action)
      );
    case 'DELETE_DOC':
      return state.filter(a =>
        doc(a, action)
      );
    default:
      return state;
  }
};

export default docs;
