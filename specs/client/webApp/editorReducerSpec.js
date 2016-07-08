/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import editor from '../../../src/client/App/Reducers/editor';

describe('annotation editor reducer', () => {
  const sampleState = {};

  it('should return the initial state', () => {
    expect(
      editor(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should update body with text input', () => {
    expect(
      editor(sampleState, {
        type: 'EDIT_TEXT',
        body: 'text',
      })
    ).to.deep.equal(
      {
        body: 'text',
      }
    );
  });

  it('should update privacy selection', () => {
    expect(
      editor(sampleState, {
        type: 'UPDATE_PRIVACY',
        privacy: true,
      })
    ).to.deep.equal(
      {
        private: true,
      }
    );
  });

  it('should update group selection', () => {
    expect(
      editor(sampleState, {
        type: 'UPDATE_GROUP',
        groupId: 1,
        groupName: 'Name',
      })
    ).to.deep.equal(
      {
        group: 1,
        groupName: 'Name',
      }
    );
  });
});
