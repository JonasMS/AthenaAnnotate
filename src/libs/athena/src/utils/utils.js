export const getText = () => {
  // suffix: 20 chars after exact
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  // const data = range.cloneContents().textContent;
  // TODO: ^ may not work well w/
  // selection of multiple nodes
  const { startOffset } = range;
  const { endOffset } = range;
  console.log('getText: ', sel);
  console.log('getText: ', range);

  const exact = range.cloneContents().textContent;

  const prefix =
    range
    .startContainer
    .textContent
    .substring(
    startOffset - 20,
    startOffset
    );

  const suffix =
    range
    .endContainer
    .textContent
    .substring(
      endOffset,
      endOffset + 20
    );

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

