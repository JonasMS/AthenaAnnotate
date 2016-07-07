/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import modal from '../../../src/client/App/Reducers/modal';

describe('modal reducer', () => {
  const sampleState = { modal: '', show: false };

  it('should return the initial state', () => {
    expect(
      modal(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should toggle showing the modal', () => {
    expect(
      modal(sampleState, { type: 'SHOW_MODAL' })
    ).to.deep.equal({ modal: '', show: true });
  });

  it('should set the modal', () => {
    expect(
      modal(sampleState, { type: 'SET_MODAL', modal: 'modal' })
    ).to.deep.equal({ modal: 'modal', show: false });
  });
});
