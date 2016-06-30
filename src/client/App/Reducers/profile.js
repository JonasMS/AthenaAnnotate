const profile = (state = false, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE':
      return true;
    case 'EXIT_PROFILE':
      return false;
    default:
      return state;
  }
};

export default profile;
