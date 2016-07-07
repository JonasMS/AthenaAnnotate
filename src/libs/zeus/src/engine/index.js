import { createRange  } from './utils';
import { wrapAnnote } from './actors';
import { locateAnnote } from './processors';
import parseDoc from './retrievers';

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
    wrapAnnote(range, annote.id, annote.type, cb);
    return range;
  }
  return null;
}
