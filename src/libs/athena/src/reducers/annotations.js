const annotations = (
  state = [],
  action
) => {
  switch (action.type) {
    case 'ADD_ANNOTE':
      return (
        state
        .concat([action.annote])
      );
    default:
      return state;
  }
};

export default annotations;
