import { saveAnnote } from '../utils/annotation';


export const shortcutHandler = (
  e,
  props
) => {
  const {
        annotation,
        annotations,
        user,
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
      actions.adderHandler('highlight');
      saveAnnote({
        annotation,
        annotations,
        user,
      });
      actions.clearAnnote();
    }
  } else if (
    e.code === 'Escape' &&
    widget === 'SHOW'
  ) {
    actions.setWidget('HIDE');
  }
};
