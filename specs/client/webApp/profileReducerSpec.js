/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import profile from '../../../src/client/App/Reducers/profile';

describe('profile reducer', () => {
  const sampleState = { show: false };

  it('should return the initial state', () => {
    expect(
      profile(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should show profiles', () => {
    expect(
      profile(sampleState, { type: 'LOAD_PROFILE' })
    ).to.deep.equal({ show: true });
  });

  it('should exit the profile', () => {
    expect(
      profile(sampleState, { type: 'EXIT_PROFILE' })
    ).to.deep.equal({ show: false });
  });

  it('should update the name store with user input', () => {
    expect(
      profile(sampleState, { type: 'UPDATE_NAME', name: 'new name' })
    ).to.deep.equal({ show: false, name: 'new name' });
  });

  it('should update the title store with user input', () => {
    expect(
      profile(sampleState, { type: 'UPDATE_TITLE', title: 'new title' })
    ).to.deep.equal({ show: false, title: 'new title' });
  });
});
