const note = (state, action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      if (state.id !== action.id) {
        return true;
      }
      return false;
    case 'EDIT_NOTE':
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
        note: action.text,
        edit: !state.edit,
      });
    default:
      return state;
  }
};

const notes = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      return state.filter(n =>
        note(n, action)
      );
    case 'EDIT_NOTE':
      return state.map(n =>
        note(n, action)
      );
    case 'SAVE_EDIT':
      return state.map(n =>
        note(n, action)
      );
    default:
      return state;
  }
};

export default notes;
