const editor = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_TEXT':
      return Object.assign({}, state, {
        body: action.body,
      });
    case 'UPDATE_PRIVACY':
      return Object.assign({}, state, {
        private: action.privacy,
      });
    case 'UPDATE_GROUP':
      return Object.assign({}, state, {
        group: action.groupId,
      });
    default:
      return state;
  }
};

export default editor;
