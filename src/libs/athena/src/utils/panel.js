export const shortcutHandler = (
  e, {
    annotation,
    annotations,
    user,
    widget,
    actions: {
      adderHandler,
      setWidget,
    },
  }
) => {
  if (e.getModifierState('Shift')) {
    if (
      e.code === 'KeyN' &&
      widget === 'HIDE'
    ) {
      adderHandler('note');
    } else if (e.code === 'KeyH') {
      adderHandler(
        'highlight', {
          annotation,
          annotations,
          user,
        }
      );
    }
  } else if (
    e.code === 'Escape' &&
    widget === 'SHOW'
  ) {
    setWidget('HIDE');
  }
};
