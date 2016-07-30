/* global describe it */
import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import path from 'path';
import NodeFilter from '../../componentMocks/NodeFilter';
import parseDoc from '../../../src/libs/zeus/src/engine/./retrievers';
import { locateAnnote } from '../../../src/libs/zeus/src/engine/./processors';
import { createRange  } from '../../../src/libs/zeus/src/engine/./utils';
import { annote01 } from './specAnnotes';
// import { HTMLElement } from '../../componentMocks/HTMLElement';
// import { retrieveAnnote } from '../../../src/libs/zeus/src/engine/';

let filePath;
let htmlDoc;
let window;
let targetStartNode;
let targetEndNode;

describe('Annotation Engine Methods', () => {
    // TODO: before each clear variable values
  it('parseDoc should be a function', () => {
    expect(parseDoc).to.be.a('function');
  });

  describe('Test Basic DOM Structure', () => {
    filePath = path.join(__dirname, '/../../../src/server/views/spec/basic.html');
    htmlDoc = fs.readFileSync(filePath, 'utf8');
    global.document = jsdom.jsdom(htmlDoc);
    window = document.defaultView;
    global.NodeFilter = NodeFilter;
    const { docText, nodes } = parseDoc(document);

    it('docText should be a string', () => { // TODO: test beforeEach
      expect(docText).to.be.a('string');
    });

    it('nodes should be an array', () => { // TODO: test beforeEach
      expect(nodes).to.be.a('array');
    });

    describe('Test annote01', () => {
      it('should return an object', () => {
        expect(locateAnnote(annote01, docText, nodes)).to.be.a('object');
      });

      it('should return the correct range', () => {
      });

      it('should return the correct parent elements', () => {

      });
    });

    describe('Test annote02', () => {
      it('should return an object', () => {
        expect(locateAnnote(annote01, docText, nodes)).to.be.a('object');
      });

      it('should return the correct range', () => {
      });

      it('should return the correct parent elements', () => {

      });
    });

    describe('Test annote03', () => {
      it('should return an object', () => {
        expect(locateAnnote(annote01, docText, nodes)).to.be.a('object');
      });

      it('should return the correct range', () => {
      });

      it('should return the correct parent elements', () => {

      });
    });
  });
});
