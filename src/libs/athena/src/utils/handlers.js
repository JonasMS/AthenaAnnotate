// docHookHandler
// adderHandler
export const adderHandler = () => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const distance = Math.abs(
    range.endOffset - range.startOffset
  );
  const adder =
    document
    .getElementsByClassName('adder')[0];

  console.log(sel);

  // activate widgetController
  adder.style.display = distance > 0 ?
    'block' : 'none';

  return adder;
};
// createHandler
// submitHandler
