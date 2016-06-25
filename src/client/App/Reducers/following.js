const following = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_FOLLOWING':
      return action.following.map(a =>
        a.follows);
    case 'TOGGLE_FOLLOW_USER':
      if (state[action.userId] === undefined) {
        return Object.assign({}, state, {
          [action.userId]: 1,
        });
      }
      return Object.assign({}, state, {
        [action.userId]: undefined,
      });
    default:
      return state;
  }
};

export default following;
