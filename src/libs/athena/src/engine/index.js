const tagOpen =
  '<span ' +
  'style="background-color: yellow;">'
;
const tagClose = '</span>';

export const parseDoc = doc => {
  let node;
  let nodes = [];
  let docText = '';
  let nodeIterator =
    document
    .createNodeIterator(
      doc,
      NodeFilter.SHOW_TEXT,
      null
    );
  // iterate over each node
  node = nodeIterator.nextNode();
  while (!!node) {
    // create node object
    nodes.push(
      {
        textNode: node,
        start: docText.length,
      }
    );
    // concat to allText
    docText += node.nodeValue;
    node = nodeIterator.nextNode();
  }
  return {
    docText,
    nodes,
  };
};

export const insertAnnote = (
  node,
  annote,
  match
) => {
  const matchIdx = match.index;
  const {
    prefix,
    exact,
  } = annote.target.selector;

  const startOffset =
    (matchIdx - node.start) + prefix.length;
  const endOffset =
    startOffset + exact.length;

  const tags = document.createElement('span');
  tags.style.backgroundColor = 'yellow';
  // make a Range obj
  const range = document.createRange();
  range.setStart(node.textNode, startOffset);
  range.setEnd(node.textNode, endOffset);

  console.log(range);
  // wrap range w/ Span's
  range.surroundContents(tags);
};

export const locateAnnote = (doc, annote) => {
  const { docText, nodes } = parseDoc(doc);
  const allLength = docText.length;
  let node;
  let nodeLen;

  const {
    prefix,
    exact,
    suffix,
  } = annote.target.selector;
  const regQuery =
    prefix +
    '\.?' +
    exact +
    '\.?' +
    suffix;

  // find matchIdx
  const reg = new RegExp(regQuery, 'g');

  console.log('reg: ', reg);

  const match = reg.exec(docText);
  console.log('match: ', match);
  // IF match, loop over nodes
  if (match) {
    const matchIdx = match.index;
    console.log('matchIdx:', matchIdx);
    for (let i = 0; i < nodes.length; i++) {
      node = nodes[i];
      nodeLen = node.textNode.nodeValue.length;
      if (!!matchIdx) {
        if (matchIdx >= node.start + nodeLen) {
          continue;
        }

        if (matchIdx < node.start) {
          break;
        }

        console.log(node, node.textNode.nodeValue);
          // return node;
        insertAnnote(
          node,
          annote,
          match
        );
        // // IF matchIdx is after node, keep going
        // if (matchIdx > node.start + nodeLen - 1) {
        //   continue;
        // }
        // // IF matchIdx occured before node, stop
        // if (matchIdx < node.start) {
        //   break;
        // }

        // If matchIdx is within node
        // if (matchIdx <= node.start + nodeLen) {
        //   console.log(node, node.textNode.nodeValue);
        //   // return node;
        //   insertAnnote(
        //     node,
        //     annote,
        //     match
        //   );
        // }
      }
    }
  } else {
    console.log('no match');
    return match;
  }
};

export const placeAnnote = (node, annote) => {
  const children = node.childNodes;
  // console.log('node: ', node);
  // console.log('children: ', children);
  if (children.length > 0) {
    for (var i = 0; i < children.length; i++) {
      placeAnnote(children[i], annote);
    }
  } else if (!!node.textContent) {
    const idx =
    node
    .textContent
    .indexOf(annote);
    // console.log('text: ', node.textContent);
    // console.log('idx: ', idx);
    if (idx >= 0) { // insert span tags
      node.parentNode.innerHTML =
        node
        .textContent
        .substring(
          0,
          idx
        ) +
        tagOpen +
        node
        .textContent
        .substring(
          idx,
          idx + annote.length
        ) +
        tagClose +
        node
        .textContent
        .substring(
          idx + annote.length
        );
    }
  }
};
