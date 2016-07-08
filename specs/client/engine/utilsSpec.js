/* global describe it */

import { expect, assert } from 'chai';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { getNextNode } from '../../../src/libs/zeus/src/engine/utils';

const filePath = path.join(__dirname, '/../../../src/server/views/spec/basic.html');
const webDoc = fs.readFileSync(filePath, 'utf8');

let $ = cheerio.load(webDoc);

const paras = $('div p');
const para1 = paras[0];

// select nodes
const node1 = para1.childNodes[0]; // text
const node2 = para1.childNodes[1]; // span
const node3 = node2.children[0]; // text

// modify nodes for fxns to work with cheerio
node1.childNodes = [];
node2.childNodes = node2.children;
node3.childNodes = [];

describe('Annotation Engine Methods', () => {
  it('should be a function', () => {
    expect(getNextNode).to.be.a('function');
    assert.equal(getNextNode(node1), node2);
    assert.equal(getNextNode(node1, node => node.nodeType === 3), node3);
  });
});

