const invites = (state = { invites: [], loaded: false }, action) => {
  switch (action.type) {
    case 'LOAD_INVITES':
      return Object.assign({}, state, {
        invites: action.invitesArray,
        loaded: true,
      });
    case 'REMOVE_INVITES':
      return Object.assign({}, state, {
        invites: state.invites.filter(invite =>
          action.groupId !== invite.GroupId
        ),
      });
    default:
      return state;
  }
};

export default invites;
