const note = (state, action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      if (state.id !== action.id) {
        // window.console.log('not matching id');
        return state;
      } else {
        // window.console.log('matching id');
        return Object.assign({}, state, {
          text: 'deleted!',
        });
      }
    default:
      return state;
  }
};

const notes = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      // window.console.log('in here');
      return state.map(n =>
        note(n, action)
      );
    default:
      return state;
  }
};

const article = (state, action) => {
  // window.console.log('in the article reducer');
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return {
        id: action.id,
        url: action.url,
        notes: action.notes,
      };
    case 'DELETE_NOTE':
      // window.console.log('in the delete note');
      return Object.assign({}, state, {
        notes: notes(state.notes, action) });
    default:
      return state;
  }
};

const articles = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return state.map(a =>
        article(a, action)
      );
    case 'DELETE_NOTE':
      // window.console.log('in the articles reducer');
      // window.console.log(state);
      return state.map(a =>
        article(a, action)
      );
    default:
      return state;
  }
};

export default articles;
