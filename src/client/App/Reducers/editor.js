const editor = (state = '', action) => {
  switch (action.type) {
    case 'EDIT_TEXT':
      return action.text;
    default:
      return state;
  }
};

export default editor;
