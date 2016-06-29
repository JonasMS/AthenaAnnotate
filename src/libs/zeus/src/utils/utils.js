export const getText = () => { // moved to engine
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
    range,
    selector: {
      exact,
      prefix,
      suffix,
    },
  };
};

export const getAnnoteId = idString => {
  const endIdx = idString.lastIndexOf('/');
  const startIdx = idString.substring(0, endIdx)
                   .lastIndexOf('e') + 1;
  return parseInt(idString.substring(startIdx, endIdx), 10) + 1;
};

export const createAnnote = ( // TODO: move somewhere
  selector,
  annoteId,
  userId
) => {
  const url = window.location.href;

  // TODO: do not use annotations.length to determine
  // annotation id, will be problematic in event of an
  // annotation deletion

  // TODO: add '/' before annoteId if target.souce
  // does not end w/ a '/'
  const id = url + '/annote' + annoteId + '/' + userId;
  return {
    id,
    creator: userId,
    body: {
      lastModified: '',
      text: '',
    },
    target: {
      source: url,
      selector,
    },
  };
};

// modifyAnnotation
// getAnnoteIdx
// insertAnnote
