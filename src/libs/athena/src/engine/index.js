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
