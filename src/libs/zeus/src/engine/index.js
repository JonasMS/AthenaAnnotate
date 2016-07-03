import Athena from './element';


// helper function
const createRegQuery = selector => {
  let query = '';
  const {
    prefix,
    exact,
    suffix,
  } = selector;

  query += !!prefix ? `${prefix}\.?` : '';
  query += `(${exact})\.?`;
  query += !!suffix ? `${suffix}?` : '';

  return query;
};

const getEndNode = (node, len) => {
  let curLen;
  let remLen = len - node.textNode.length;
  let curNode = node.textNode.nextSibling;
  while (!!curNode) {
    curLen = curNode.nodeType === 3 ?
      curNode.length :
      curNode.textContent.length;

    if (remLen - curLen <= 0) {
      return {
        textNode: curNode,
        endOffset: remLen + 1,
      };
    }
    remLen -= curLen;
    curNode = curNode.nextSibling;
  }
  return {
    textNode: node.textNode,
    endOffset: remLen,
  };
};

// returns a string docText that contains all
// textNodes and an array of nodes that
// correspond to each substring
export const parseDoc = doc => {
  let docText = '';
  let node;
  const nodes = [];
  const nodeIterator = document.createNodeIterator(
    doc,
    NodeFilter.SHOW_TEXT,
    textNode => (
        textNode.parentElement.nodeName.toLowerCase() !== 'script' ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      )
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

Range.prototype.canSurroundContents = function() {
  return this.startContainer.parentElement === this.endContainer.parentElement;
};


// return an array of ranges to be wrapped
const getNextNode = n => {
  let node = n;
  if (!!node.childNodes.length) {
    return node.firstChild;
  }

  while (!!node && !node.nextSibling) {
    node = node.parentNode;
  }

  if (!node) {
    return null;
  }

  return node.nextSibling;
};

const getRangeNodes = range => { // TODO: add filter arg
  let node = range.startContainer;
  const endNode = range.endContainer;
  const nodes = [];
  if (node === endNode) {
    return node;
  }

  while (!!node && node !== endNode) {
    nodes.push(node);
    node = getNextNode(node);
  }
  nodes.push(endNode);

  return nodes;
};

const sortNodesBy = (nodes, prop) => {
  const ref = new Map();
  const sorted = {};
  let sortedBy;
  let key;

  nodes.forEach(node => {
    sortedBy = node[prop];
    if (ref.has(sortedBy)) {
      key = ref.get(sortedBy);
      sorted[key].push(node);
    } else {
      key = ref.size;
      ref.set(sortedBy, key);
      sorted[key] = [node];
    }
  });
  return { ref, sorted };
};

export const createRange = (startNode, endNode) => {
  const range = document.createRange();
  const { startOffset } = startNode;
  const { endOffset } = endNode;

  range.setStart(startNode.textNode, startOffset);
  range.setEnd(endNode.textNode, endOffset);

  return range;
};

export const wrapAnnote = (range, annoteId, cb) => {
  let athena = new Athena;
  athena.addListener(cb);
  athena.addDataProp('id', annoteId);

  // if canSurroundContents
  if (range.canSurroundContents()) {
    range.surroundContents(athena);
    range.detach();
    return range;
  }
  // else, make new ranges and wrap them individually
  let newRange;
  let startNode;
  let endNode;
  const ranges = [];
  const textNodes = getRangeNodes(range).filter(node => node.nodeType === 3);
  const { sorted } = sortNodesBy(textNodes, 'parentNode');

  Object.keys(sorted).reduce((result, key) => {
    result.push(sorted[key]);
    return result;
  }, [])
  .forEach((nodes, idx, collection) => {
    athena = new Athena;
    athena.addListener(cb);
    athena.addDataProp('id', annoteId);
    startNode = nodes[0];
    endNode = nodes[nodes.length - 1];
    if (idx === 0) { // handle first range
      newRange = createRange(
        { textNode: startNode, startOffset: range.startOffset },
        { textNode: endNode, endOffset: endNode.textContent.length }
      );
    } else if (idx === collection.length - 1) { // handle last range
      newRange = createRange(
        { textNode: startNode, startOffset: 0 },
        { textNode: endNode, endOffset: range.endOffset }
      );
    } else {
      newRange = createRange(
        { textNode: startNode, startOffset: 0 },
        { textNode: endNode, endOffset: endNode.textContent.length }
      );
    }
    newRange.surroundContents(athena);
    ranges.push(newRange);
  });
  return ranges;
};

export const unwrapAnnote = (annoteId) => {
  const node = document.querySelector(`[data-id='${annoteId}']`);
  const { parentNode, nextSibling } = node;
  const content = node.textContent;
  const textNode = document.createTextNode(content);
  parentNode.removeChild(node);
  parentNode.insertBefore(textNode, nextSibling);
};

// returns range
// wraps the selected text in a custom
// html element
export const insertAnnote = (startNode, endNode, cb) => {
  const range = createRange(startNode, endNode);
  wrapAnnote(range, cb);
  return range;
};

// should return the location of a given
// annote within a given node
export const locateAnnote = (annote, docText, nodes) => {
  // const { docText, nodes } = parseDoc(doc);
  let startNode;
  let endNode;
  let nodeLen;

  const { selector } = annote.target;
  const regQuery = createRegQuery(selector);

  // find index in document text where match starts
  const reg = new RegExp(regQuery, 'g');
  const match = reg.exec(docText);
  // IF match, find the match's corresponding node(s)
  if (!!match) {
    const matchIdx = match.index;
    for (let i = 0; i < nodes.length; i++) {
      startNode = nodes[i];
      nodeLen = startNode.textNode.nodeValue.length;

      if (!!matchIdx) {
        if (matchIdx >= startNode.start + nodeLen) {
          continue;
        }

        if (matchIdx < startNode.start) {
          break;
        }

        startNode.startOffset =
        (matchIdx - startNode.start) + selector.prefix.length;
        // IF match spans multiple nodes find the endNode
        // ELSE, endNode is the same node as startNode

        endNode = matchIdx + match[1].length > startNode.start + nodeLen ?
          getEndNode(startNode, match[1].length) :
        {
          textNode: startNode.textNode,
          endOffset: startNode.startOffset + match[1].length,
        };
        return ({ startNode, endNode });
        // insertAnnote(startNode, endNode, selector.prefix, match);
      }
      // TODO: Handle case inwhich an annotation cannot be retrieved
    }
  }
  console.log('no match');
  return null;
};

// Returns Range of retrieved annotation or null
// if the annotation could not be retrieved
export function retrieveAnnote(doc, annote, cb) {
  // parse document
  const { docText, nodes } = parseDoc(doc);
  // determine annote's location on document
  const annoteLocation = locateAnnote(annote, docText, nodes);
  // insert annote
  if (!!annoteLocation) {
    const { startNode, endNode } = annoteLocation;
    const range = createRange(startNode, endNode);
    wrapAnnote(range, annote.id, cb);
    return range;
    // return insertAnnote(startNode, endNode, cb);
  }
  return null;
}
