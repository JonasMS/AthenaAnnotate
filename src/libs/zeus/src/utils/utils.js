export const getText = () => {
  // suffix: 20 chars after exact
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const { data } = sel.focusNode;
  // const data = range.cloneContents().textContent;
  // TODO: ^ may not work well w/
  // selection of multiple nodes
  const { startOffset } = range;
  const { endOffset } = range;
  // console.log('getText: ', sel);
  // console.log('getText: ', range);

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

// TODO: move to engine?

export const createAnnote = (
  annoteId,
  userId
) => {
  const url = window.location.href;
  const selector = getText();

  // TODO: do not use annotations.length to determine
  // annotation id, will be problematic in event of an
  // annotation deletion

  // TODO: add '/' before annoteId if target.souce
  // does not end w/ a '/'
  const id = url + '/annote' + annoteId + '/' + userId;
  return {
    id,
    creator: userId,
    body: '',
    target: {
      source: url,
      selector,
    },
  };
};

// modifyAnnotation
// getAnnoteIdx
// insertAnnote
