const group = (state = { showGroups: false, loaded: false }, action) => {
  switch (action.type) {
    case 'LOAD_GROUPS':
      return Object.assign({}, state, {
        groups: action.groups,
        loaded: true,
      });
    case 'EDIT_GROUP_NAME':
      return Object.assign({}, state, {
        edit: action.edit,
      });
    case 'SET_GROUP':
      return Object.assign({}, state, {
        selected: action.groupId,
        loaded: false,
      });
    case 'SHOW_GROUPS':
      return Object.assign({}, state, {
        showGroups: !state.showGroups,
      });
    case 'SHOW_MODAL':
      return Object.assign({}, state, {
        edit: '',
      });
    case 'SHOW_INFO':
      return Object.assign({}, state, {
        info: action.info,
      });
    case 'TOGGLE_RIGHTS':
      return Object.assign({}, state, {
        info: Object.assign({}, state.info, {
          members: state.info.members.map(member => {
            if (member.data.id !== action.id) {
              return member;
            }
            return Object.assign({}, member, {
              rights: !member.rights,
            });
          }),
        }),
      });
    case 'LOG_OUT':
      return { showGroups: false, loaded: false };
    default:
      return state;
  }
};

export default group;
