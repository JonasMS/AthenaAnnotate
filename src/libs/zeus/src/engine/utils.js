export const sanitize = str => (
  str.replace(/[\\^$.*+?()[\]]+/g, '\\$&')
);

// helper function
export const createRegQuery = selector => {
  let query = '';
  const {
    prefix,
    exact,
    suffix,
  } = selector;

  query += !!prefix ? `${sanitize(prefix)}\.?` : '';
  query += `(${sanitize(exact)})\.?`;
  query += !!suffix ? `${sanitize(suffix)}?` : '';

  return query;
};

export const getTextNodes = node => (
  document.createNodeIterator(
    node,
    NodeFilter.SHOW_TEXT,
    textNode => (
        textNode.parentElement.nodeName.toLowerCase() !== 'script' ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    )
  )
);

// returns the next node,
// either the next siblingNode or the siblingNode of a parentNode
export const getNextNode = (n, f) => {
  const filter = f || (() => true);
  let node = n;
  do {
    if (!!node.childNodes.length) {
      // console.log('node has child: ', node.firstChild.data);
      node = node.firstChild;
      if (filter(node)) {
        return node;
      }
      continue;
      // return node.firstChild;
    }

    while (!!node && !node.nextSibling) {
      node = node.parentNode;
    }

    if (!node) {
      return null;
    }
    node = node.nextSibling;
  } while (!filter(node));

  return node; // .nextSibling;
};

// creates a new range
export const createRange = (startNode, endNode) => {
  const range = document.createRange();
  const { startOffset } = startNode;
  const { endOffset } = endNode;

  range.setStart(startNode.textNode, startOffset);
  range.setEnd(endNode.textNode, endOffset);

  return range;
};

