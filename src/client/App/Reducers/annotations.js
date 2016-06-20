const annotation = (state, action) => {
  switch (action.type) {
    case 'LOAD_ANNOTATION':
      return {
        id: state.id,
        body: state.body,
        target: state.target,
        doc_id: state.doc_id,
        edit: state.edit,
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
    default:
      return state;
  }
};

const annotations = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ANNOTATION':
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
    default:
      return state;
  }
};

export default annotations;
