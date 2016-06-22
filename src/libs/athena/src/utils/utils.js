export const getText = () => {
  // suffix: 20 chars after exact
  const sel = window.getSelection();
  const { data } = sel.focusNode;
  const exStart = sel.focusOffset;
  const exEnd = sel.anchorOffset;
  const exact =
    data
    .substring(
      exStart,
      exEnd
     );
  const prefix = data.substring(exStart - 20, exStart);
  const suffix = data.substring(exEnd, exEnd + 20);

  return {
    exact,
    prefix,
    suffix,
  };
};

export const setWidgClass = (widget) => (
    widget === 'HIDE' ?
      'widget widget_hide' :
      'widget widget_show'
);

export const setAddClass = (adder) => (
  adder === 'HIDE' ?
    'adder adder_hide' :
    'adder adder_show'
);

