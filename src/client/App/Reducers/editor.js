const editor = (state = '', action) => {
  switch (action.type) {
    case 'EDIT_TEXT':
      return action.body;
    default:
      return state;
  }
};

export default editor;
