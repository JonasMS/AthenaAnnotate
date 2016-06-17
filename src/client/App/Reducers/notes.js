const note = (state, action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        text: 'deleted!',
      });
    default:
      return state;
  }
};

const notes = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      return state.map(n =>
        note(n, action)
      );
    default:
      return state;
  }
};

export default notes;
