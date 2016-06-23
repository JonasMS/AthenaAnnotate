const annotation = (state, action) => {
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      return {
        id: state.id,
        body: state.text,
        target: state.exact,
        doc_id: state.DocId,
        edit: false,
      };
    case 'DELETE_ANNOTATION':
      if (state.id !== action.id) {
        return true;
      }
      return false;
    case 'EDIT_ANNOTATION':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        edit: !state.edit,
      });
    case 'SAVE_EDIT':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        body: action.body,
        edit: !state.edit,
      });
    case 'DELETE_BODY':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        body: null,
        edit: !state.edit,
      });
    default:
      return state;
  }
};

const annotations = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      return action.annotations.map(a =>
        annotation(a, action)
      );
    case 'DELETE_ANNOTATION':
      return state.filter(a =>
        annotation(a, action)
      );
    case 'EDIT_ANNOTATION':
      return state.map(a =>
        annotation(a, action)
      );
    case 'SAVE_EDIT':
      return state.map(a =>
        annotation(a, action)
      );
    case 'DELETE_BODY':
      return state.map(a =>
        annotation(a, action)
      );
    default:
      return state;
  }
};

export default annotations;
