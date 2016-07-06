const doc = (state, action) => {
  let counter = 0;
  switch (action.type) {
    case 'LOAD_DOCS':
      return {
        id: state.Doc.id,
        url: state.Doc.url,
        image: state.Doc.image,
        title: state.Doc.title,
        baseUrl: state.Doc.baseUrl,
        count: 0,
      };
    case 'LOAD_ANNOTATIONS':
      action.annotations.forEach(annotation => {
        if (annotation.Doc.id === state.id) {
          counter ++;
        }
      });
      return Object.assign({}, state, {
        count: counter,
      });
    case 'DELETE_DOC':
      if (action.id !== state.id) {
        return true;
      }
      return false;
    case 'DOC_PRIVATE':
      if (action.id !== state.id) {
        return state;
      }
      return Object.assign({}, state, {
        privacy: true,
      });
    case 'DOC_PUBLIC':
      if (action.id !== state.id) {
        return state;
      }
      return Object.assign({}, state, {
        privacy: false,
      });
    default:
      return state;
  }
};

const docs = (state = [], action) => {
  let Docs = [];
  let docList = [];
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      docList = action.annotations.reduce((prev, curr) => {
        if (prev.indexOf(curr.Doc.id) === -1) {
          Docs.push(curr);
          prev.push(curr.Doc.id);
          return prev;
        }
        return prev;
      }, docList);
      Docs = Docs.map(a =>
        doc(a, { type: 'LOAD_DOCS' })
      );
      return Docs.map(a =>
        doc(a, action)
      );
    case 'DELETE_DOC':
      return state.filter(a =>
        doc(a, action)
      );
    case 'DOC_PRIVATE':
      return docs.map(a =>
        doc(a, action)
      );
    case 'DOC_PUBLIC':
      return docs.map(a =>
        doc(a, action)
      );
    default:
      return state;
  }
};

export default docs;
