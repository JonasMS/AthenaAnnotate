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
