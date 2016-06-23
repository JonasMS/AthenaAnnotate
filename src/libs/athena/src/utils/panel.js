
export const shortcutHandler = (
  e,
  props
) => {
  const {
        widget,
        actions,
      } = props;

  if (e.getModifierState('Shift')) {
    if (
      e.code === 'KeyN' &&
      widget === 'HIDE'
    ) {
      actions.adderHandler('note');
    } else if (e.code === 'KeyH') {
      actions.adderHandler(
        'highlight',
        props
      );
    }
  } else if (
    e.code === 'Escape' &&
    widget === 'SHOW'
  ) {
    actions.setWidget('HIDE');
  }
};
