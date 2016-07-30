/* global describe it */
import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import path from 'path';
import NodeFilter from '../../componentMocks/NodeFilter';
import parseDoc from '../../../src/libs/zeus/src/engine/./retrievers';
import { locateAnnote } from '../../../src/libs/zeus/src/engine/./processors';
import { createRange  } from '../../../src/libs/zeus/src/engine/./utils';
// import { HTMLElement } from '../../componentMocks/HTMLElement';
// import { retrieveAnnote } from '../../../src/libs/zeus/src/engine/';


const filePath = path.join(__dirname, '/../../../src/server/views/spec/basic.html');
const htmlDoc = fs.readFileSync(filePath, 'utf8');
global.document = jsdom.jsdom(htmlDoc);
const window = document.defaultView;
global.NodeFilter = NodeFilter;
// global.HTMLElement = window.HTMLElement;
// console.log(HTMLElement);

describe('Annotation Engine Methods', () => {
  describe('parseDoc method', () => {
    it('parseDoc should be a function', () => {
      expect(parseDoc).to.be.a('function');
    });
    it('parseDoc should return the correct docText and nodes', () => {
      const { docText, nodes } = parseDoc(document);
      console.log(nodes);
      expect(nodes).to.be.a('array');
      // expect(document).to.be.a('object');
    });
  });
});
