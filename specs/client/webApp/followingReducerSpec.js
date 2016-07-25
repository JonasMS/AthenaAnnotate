/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import following from '../../../src/client/App/Reducers/following';

describe('following reducer', () => {
  const sampleState = { loaded: false };

  it('should return the initial state', () => {
    expect(
      following(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should load users', () => {
    expect(
      following(sampleState, {
        type: 'LOAD_FOLLOWING',
        following: [{ id: 1, name: 'name' }],
      })
    ).to.deep.equal(
      {
        users: [{ id: 1, name: 'name' }],
        loaded: true,
      }
    );
  });

  it('should set the loading state to false in the following store', () => {
    expect(
      following({ loaded: true }, {
          type: 'TOGGLE_FOLLOW_USER',
        }
      )
    ).to.deep.equal(
      {
        loaded: false,
      }
    );
  });

  it('should set a user as selected', () => {
    expect(
      following(sampleState, {
        type: 'SET_USER',
        userId: 1,
      })
    ).to.deep.equal(
      {
        selected: 1,
        loaded: false
      }
    );
  });
});
