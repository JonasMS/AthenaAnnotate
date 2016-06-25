import Athena from './element';

// returns a string docText that contains all
// textNodes and an array of nodes that
// correspond to each substring
export const parseDoc = doc => {
  let docText = '';
  let node;
  const nodes = [];
  const nodeIterator =
    document
    .createNodeIterator(
      doc,
      NodeFilter.SHOW_TEXT,
      function(node) {
        return node.parentElement.nodeName.toLowerCase() !==
          'script' ?
            NodeFilter.FILTER_ACCEPT :
            NodeFilter.FILTER_REJECT;
      }
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

// returns range
// wraps the selected text in a custom
// html element
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

  // make a Range obj
  const startOffset =
    (matchIdx - node.start) + prefix.length;
  const endOffset =
    startOffset + exact.length;

  const range = document.createRange();
  range.setStart(node.textNode, startOffset);
  range.setEnd(node.textNode, endOffset);

  // console.log(range);

  // wrap selection in athena-annote tag
  const athena = new Athena;
  const cb = function() {
    console.log('clicked!!');
  };
  athena.addListener(cb);
  range.surroundContents(athena);
  return range;
};

// should return the location of a given
// annote within a given node
export const locateAnnote = (doc, annote) => {
  const { docText, nodes } = parseDoc(doc);
  let node;
  let nodeLen;

  // console.log(annote);

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
    suffix + '?';

  // find matchIdx
  const reg = new RegExp(regQuery, 'g');

  // console.log('reg: ', reg);

  const match = reg.exec(docText);
  // console.log('match: ', match);
  // IF match, loop over nodes
  if (match) {
    const matchIdx = match.index;
    // console.log('matchIdx:', matchIdx);
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

        // console.log(node, node.textNode.nodeValue);
          // return node;
        insertAnnote(
          node,
          annote,
          match
        );
      }
    }
  } else {
    console.log('no match');
    return match;
  }
};
