/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import search from '../../../src/client/App/Reducers/search';

describe('search reducer', () => {
  const sampleState = { users: [], selected: [] };

  it('should return the initial state', () => {
    expect(
      search(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should clear store when loading new modal', () => {
    expect(
      search(sampleState, { type: 'SHOW_MODAL' })
    ).to.deep.equal({ users: [], selected: [] });
  });

  it('should load search results', () => {
    expect(
      search(sampleState, { type: 'LOAD_SEARCH_USERS', users: [1, 2, 3] })
    ).to.deep.equal({ users: [1, 2, 3], selected: [] });
  });

  it('should add selected users to selected list', () => {
    expect(
      search({ users: [{ name: 'name' }], selected: [] }, { type: 'SELECT_USER', name: 'name' })
    ).to.deep.equal({ users: [{ name: 'name' }], selected: ['name'] });
  });

  it('should remove selected users from selected list', () => {
    expect(
      search({ users: [{ name: 'name' }], selected: ['name'] }, { type: 'DESELECT_USER', name: 'name' })
    ).to.deep.equal({ users: [{ name: 'name' }], selected: [] });
  });

  it('should clear the search store', () => {
    expect(
      search({ users: [{ name: 'name' }], selected: ['name'] }, { type: 'CLEAR_SEARCH' })
    ).to.deep.equal(sampleState);
  });
});
