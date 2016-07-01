const search = (state = { users: [], selected: [] }, action) => {
  const selected = state.selected;
  switch (action.type) {
    case 'LOAD_SEARCH_USERS':
      return Object.assign({}, state, {
        users: action.users,
      });
    case 'SELECT_USER':
      if (selected.indexOf(action.name) === -1) {
        selected.push(action.name);
      }
      return Object.assign({}, state, {
        selected,
      });
    case 'DESELECT_USER':
      if (selected.indexOf(action.name) !== -1) {
        selected.splice(selected.indexOf(action.name), 1);
      }
      return Object.assign({}, state, {
        selected,
      });
    default:
      return state;
  }
};

export default search;
