const doc = (state, action) => {
  switch (action.type) {
    case 'LOAD_DOC':
      return {
        id: state.id,
        url: state.url,
      };
    default:
      return state;
  }
};

const docs = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DOC':
      return action.docs.map(a =>
        doc(a, action)
      );
    default:
      return state;
  }
};

export default docs;
