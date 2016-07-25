const filter = (state = 'Self', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter;
    case 'LOG_OUT':
      return 'Self';
    default:
      return state;
  }
};

export default filter;
