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
let targetStartIdx;
let exact;
let targetLength;
let annoteLocation;


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
    const { docText, nodes } = parseDoc(document.body);

    console.log(docText.substring(775, 820));

    it('docText should be a string', () => { // TODO: test beforeEach
      expect(docText).to.be.a('string');
    });

    it('nodes should be an array', () => { // TODO: test beforeEach
      expect(nodes).to.be.a('array');
    });

    describe('Test annote01', () => {
      annoteLocation = locateAnnote(annote01, docText, nodes);
      const { startNode, endNode } = annoteLocation;
      console.log(startNode);
      console.log(endNode);

      targetStartIdx = 775;
      exact = annote01.target.selector.exact;
      targetLength = exact.length;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('startNode.start should equal 775', () => {
        expect(startNode.start + startNode.startOffset).to.be.equal(targetStartIdx);
      });
      it('the "exact" string should match docText.substring', () => {
        expect(exact).to.equal(docText.substring(targetStartIdx, targetStartIdx + targetLength));
      });

      it('startNode should equal the given node', () => {

      });
      it('startNode.textNode should equal the given textNode', () => {

      });
      it('endNode.offset should equal 59', () => {

      });
      it('endNOde should equal the given node', () => {

      });
      it('endNode.textNode should equal the given textNode', () => {

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
