const loading = (state = false, action) => {
  switch (action.type) {
    case 'LOADING':
      return action.loading;
    case 'LOG_OUT':
      return false;
    default:
      return state;
  }
};

export default loading;
