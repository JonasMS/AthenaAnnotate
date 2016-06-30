import Athena from './element';


// helper function
const createRegQuery = selector => {
  let query = '';
  const {
    prefix,
    exact,
    suffix,
  } = selector;


  query += !!prefix ?
    prefix + '\.?' : '';
  query += ('(' + exact + ')\.?');
  query += !!suffix ?
    suffix + '?' : '';

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
        end: remLen + 1,
      };
    }
    remLen -= curLen;
    curNode = curNode.nextSibling;
  }
  return {
    textNode: node.textNode,
    end: remLen,
  };
};

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

export const wrapAnnote = (range) => {
  const athena = new Athena;
  const cb = function() {
    console.log('clicked!!');
  };
  athena.addListener(cb);
  range.surroundContents(athena);
  // TODO: range.detach()
  return range;
};

// returns range
// wraps the selected text in a custom
// html element
export const insertAnnote = (startNode, endNode, annote, match) => {
  const matchIdx = match.index;
  const {
    prefix,
  } = annote.target.selector;

  // debugger;
  // make a Range obj
  const range = document.createRange();
  const startOffset = (matchIdx - startNode.start) + prefix.length;
  const endOffset = startNode === endNode ?
    startOffset + match[1].length : endNode.end;
  // const endOffset = endNode.offset;
    // startOffset + exact.length;

  console.log(endNode, ' ', endOffset);

  range.setStart(startNode.textNode, startOffset);
  range.setEnd(endNode.textNode, endOffset);
  // console.log('node: ', node);
  // console.log('insertAnnote: ', range);

  // wrap selection in athena-annote tag
  const athena = new Athena;
  const cb = function() {
    console.log('clicked!!');
  };
  athena.addListener(cb);
  range.surroundContents(athena);
  // TODO: range.detach()
  return range;
};

// should return the location of a given
// annote within a given node
export const locateAnnote = (doc, annote) => {
  const { docText, nodes } = parseDoc(doc);
  let startNode;
  let endNode;
  let nodeLen;

  const { selector } = annote.target;
  const regQuery = createRegQuery(selector);

  // find index in document text where match starts
  const reg = new RegExp(regQuery, 'g');
  const match = reg.exec(docText);
  // IF match, find the match's corresponding node(s)
  if (match) {
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
        // IF match spans multiple nodes find the endNode
        // ELSE, endNode is the same node as startNode
        if (matchIdx + match[1].length > startNode.start + nodeLen) {
          endNode = getEndNode(startNode, match[1].length);
        } else {
          endNode = startNode;
        }
        insertAnnote(startNode, endNode, selector.prefix, match);
      } else {
        // TODO: Handle case inwhich an annotation cannot be retrieved
        console.log('no match');
        return match;
      }
    }
  }
};

export function retrieveAnnote() {

}
