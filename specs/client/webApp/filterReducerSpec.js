/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import filter from '../../../src/client/App/Reducers/filter';

describe('filter reducer', () => {
  const sampleState = 'Self';

  it('should return the initial state', () => {
    expect(
      filter(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should update the filter', () => {
    expect(
      filter(sampleState, {
        type: 'FILTER',
        filter: 'other filter',
      })
    ).to.deep.equal('other filter');
  });
});
