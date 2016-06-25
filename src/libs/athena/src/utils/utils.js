export const getText = () => {
  // suffix: 20 chars after exact
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const { data } = sel.focusNode;
  // TODO: ^ may not work well w/
  // selection of multiple nodes
  const startOffset = range.startOffset;
  const endOffset = range.endOffset;
  const exact =
    data
    .substring(
      startOffset,
      endOffset
     );
  const prefix = data.substring(
    startOffset - 20,
    startOffset
  );
  const suffix = data.substring(
    endOffset,
    endOffset + 20
  );

  console.log('range: ', range);

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

