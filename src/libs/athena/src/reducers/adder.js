const adder = (
  state = 'HIDE',
  action
) => {
  switch (action.type) {
    case 'SET_ADDER':
      return action.display;
    default:
      return state;
  }
};

export default adder;
