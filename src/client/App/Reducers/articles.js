const note = (state, action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      if (state.id !== action.id) {
        // window.console.log('not matching id');
        return true;
      }
      // window.console.log('matching id');
      return false;
      // !window.confirm('Are you sure you want to delete this note?');
    case 'EDIT_NOTE':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        edit: !state.edit,
      });
    case 'EDIT_TEXT':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        note: action.note,
        edit: !state.edit,
      });
    default:
      return state;
  }
};

const notes = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_NOTE':
      return state.filter(n =>
        note(n, action)
      );
    case 'EDIT_NOTE':
      return state.map(n =>
        note(n, action)
      );
    case 'EDIT_TEXT':
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
    case 'EDIT_NOTE':
      return Object.assign({}, state, {
        notes: notes(state.notes, action) });
    case 'EDIT_TEXT':
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
    case 'EDIT_NOTE':
      return state.map(a =>
        article(a, action)
      );
    case 'EDIT_TEXT':
      return state.map(a =>
        article(a, action)
      );
    default:
      return state;
  }
};

export default articles;
