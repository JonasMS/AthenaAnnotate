import Athena from './element';

export const createAnnote = (
  selector,
  annoteId,
  userId
) => {
  const url = window.location.href;

  // TODO: add '/' before annoteId if target.source
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
    range,
    selector: {
      exact,
      prefix,
      suffix,
    },
  };
};

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
  let remLen = len;
  let curNode = node.nextSibling;
  while (!!curNode) {
    curLen = curNode.nodeType === 3 ?
      curNode.length :
      curNode.textContent.length;

    if (remLen - curLen <= 0) {
      return {
        curNode,
        remLen,
      };
    }
    remLen -= curLen;
    curNode = curNode.nextSibling;
  }
  return {
    node,
    remLen,
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
export const insertAnnote = ( // TODO: only need target or selector
  node,
  endNode,
  annote,
  match
) => {
  const matchIdx = match.index;
  const {
    prefix,
    exact,
  } = annote.target.selector;


  // make a Range obj
  const range = document.createRange();
  const startOffset =
    (matchIdx - node.start) + prefix.length;
  const endOffset =
    startOffset + exact.length;

  range.setStart(node.textNode, startOffset);
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
export const locateAnnote = (doc, annote) => { // TODO: only need to pass in target
  const { docText, nodes } = parseDoc(doc);
  let node;
  let endNode;
  let nodeLen;
  // let nodeLen;

  // console.log(annote);

  const { selector } = annote.target;
  const regQuery = createRegQuery(selector);

  // find matchIdx
  const reg = new RegExp(regQuery, 'g');

  // console.log('reg: ', reg);

  const match = reg.exec(docText);
  // console.log('match: ', match[1]);
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

        if (
          matchIdx + match[1].length >
          node.start + nodeLen
        ) {
          console.log('MULTIPLE NODES');
          endNode = node;
          // endNode = getEndNode(
          //   node,
          //   match[1].length
          // );
        } else {
          endNode = node;
          // endNode = {
          //   node: nodes[i],
          //   offset: matchIdx + match[1].length
        }

        // console.log(node, node.textNode.nodeValue);
          // return node;
        insertAnnote(
          node,
          endNode,
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
