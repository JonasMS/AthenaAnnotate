const listView = (state = false, action) => {
  switch (action.type) {
    case 'SWITCH_VIEW':
      // window.console.log(state);
      return !state;
    case 'LOG_OUT':
      return false;
    default:
      return state;
  }
};

export default listView;
