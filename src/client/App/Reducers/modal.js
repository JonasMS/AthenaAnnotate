const modal = (state = { modal: '', show:false}, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return Object.assign({}, state, {
        show: true,
      });
    case 'SET_MODAL':
      return Object.assign({}, state, {
        modal: action.modal,
      });
    default:
      return state;
  }
};

export default modal;
