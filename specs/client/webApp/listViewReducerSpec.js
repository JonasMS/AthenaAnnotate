/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import listView from '../../../src/client/App/Reducers/listView';

describe('listView reducer', () => {
  const sampleState = false;

  it('should return the initial state', () => {
    expect(
      listView(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should switch the view', () => {
    expect(
      listView(sampleState, { type: 'SWITCH_VIEW' })
    ).to.deep.equal(true);
  });
});
