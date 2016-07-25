/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import invites from '../../../src/client/App/Reducers/invites';

describe('invites reducer', () => {
  const sampleState = { invites: [], loaded: false };

  it('should return the initial state', () => {
    expect(
      invites(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should load invites', () => {
    expect(
      invites(sampleState, { type: 'LOAD_INVITES', invitesArray: [1, 2, 3] })
    ).to.deep.equal({ invites: [1, 2, 3], loaded: true });
  });

  it('should remove invites from store', () => {
    expect(
      invites({ invites: [{ GroupId: 1 }], loaded: false }, { type: 'REMOVE_INVITES', groupId: 1 })
    ).to.deep.equal({ invites: [], loaded: false });
  });
});
