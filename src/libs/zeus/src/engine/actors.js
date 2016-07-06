import Athena from './element';
import { createSubRanges } from './processors';

Range.prototype.canSurroundContents = function() {
  return this.startContainer.parentElement === this.endContainer.parentElement;
};

// creates the html element used for marking annotations
export const createAnnoteElement = (annoteId, cb) => {
  const athena = new Athena;
  athena.addDataProp('id', annoteId);
  athena.addListener(cb);
  return athena;
};

export const wrapAnnote = (range, annoteId, cb) => {
  // if canSurroundContents
  if (range.canSurroundContents()) {
    const athena = createAnnoteElement(annoteId, cb);
    range.surroundContents(athena);
    range.detach();
    return range;
  }
  // else, make new ranges and wrap them individually
  return createSubRanges(range, subRange => {
    const athena = createAnnoteElement(annoteId, cb);
    subRange.surroundContents(athena);
    subRange.detach();
  });
};

export const unwrapAnnote = (annote) => {
  const node = typeof annote === 'object' ?
    annote : document.querySelector(`[data-id='${annote}']`);
  const { parentNode, nextSibling } = node;
  const content = node.textContent;
  const textNode = document.createTextNode(content);
  parentNode.removeChild(node);
  parentNode.insertBefore(textNode, nextSibling);
};
