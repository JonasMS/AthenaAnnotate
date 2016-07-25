const profile = (state = { show: false, selected: 'pending' }, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE':
      return Object.assign({}, state, {
        show: true,
      });
    case 'EXIT_PROFILE':
      return Object.assign({}, state, {
        show: false,
        selected: 'pending',
      });
    case 'UPDATE_NAME':
      return Object.assign({}, state, {
        name: action.name,
      });
    case 'UPDATE_TITLE':
      return Object.assign({}, state, {
        title: action.title,
      });
    case 'SELECT_TAB':
      return Object.assign({}, state, {
        selected: action.tab,
      });
    case 'LOG_OUT':
      return { show: false, selected: 'pending' };
    default:
      return state;
  }
};

export default profile;
