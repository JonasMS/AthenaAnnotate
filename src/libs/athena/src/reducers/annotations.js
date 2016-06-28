const annotations = (
  state = [],
  action
) => {
  switch (action.type) {
    case 'ADD_ANNOTE':
      return Array.isArray(action.annote) ?
        state.concat(action.annote) : state.concat([action.annote]);
    default:
      return state;
  }
};

export default annotations;
