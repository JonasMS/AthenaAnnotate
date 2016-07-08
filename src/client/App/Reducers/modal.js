const modal = (state = { modal: '', show: false }, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return Object.assign({}, state, {
        show: !state.show,
      });
    case 'SET_MODAL':
      return Object.assign({}, state, {
        modal: action.modal,
      });
    case 'LOG_OUT':
      return { modal: '', show: false };
    default:
      return state;
  }
};

export default modal;
