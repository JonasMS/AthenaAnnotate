const following = (state = { loaded: false }, action) => {
  const obj = { loaded: true };
  switch (action.type) {
    case 'LOAD_FOLLOWING':
      action.following.forEach(user => {
        obj[user] = 1;
      });
      return Object.assign({}, state, obj);
    case 'TOGGLE_FOLLOW_USER':
      if (state[action.userId] === undefined) {
        return Object.assign({}, state, {
          [action.userId]: 1,
          loaded: false,
        });
      }
      return Object.assign({}, state, {
        [action.userId]: undefined,
        loaded: false,
      });
    default:
      return state;
  }
};

export default following;
