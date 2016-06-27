const group = (state = { showGroups: false, loaded: false }, action) => {
  switch (action.type) {
    case 'LOAD_GROUPS':
      return Object.assign({}, state, {
        groups: action.groups,
        loaded: true,
      });
    case 'LEAVE_GROUP':
      return Object.assign({}, state, {
        groups: state.groups.splice(state.groups.indexOf(action.groupId), 1),
      });
    case 'SET_GROUP':
      return Object.assign({}, state, {
        selected: action.groupId,
      });
    case 'SHOW_GROUPS':
      return Object.assign({}, state, {
        showGroups: !state.showGroups,
      });
    default:
      return state;
  }
};

export default group;
