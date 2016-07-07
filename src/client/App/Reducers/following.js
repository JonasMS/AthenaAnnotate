const following = (state = { loaded: false }, action) => {
  // const obj = { loaded: true };
  switch (action.type) {
    case 'LOAD_FOLLOWING':
      return Object.assign({}, state, {
        users: action.following.map(user => (
          { id: user.id, name: user.name }
        )),
        loaded: true,
      });
    case 'TOGGLE_FOLLOW_USER':
      return Object.assign({}, state, {
        // users: state.users.filter(user =>
        //   user.id === action.userId
        // ),
        loaded: false,
      });
    case 'SET_USER':
      return Object.assign({}, state, {
        selected: action.userId,
      });
    default:
      return state;
  }
};

export default following;
