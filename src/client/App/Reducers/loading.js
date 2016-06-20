const loading = (state = true, action) => {
  switch (action.type) {
    case 'LOADING':
      return action.loading;
    default:
      return state;
  }
};

export default loading;
