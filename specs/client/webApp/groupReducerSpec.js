/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import group from '../../../src/client/App/Reducers/group';

describe('group reducer', () => {
  const sampleState = { showGroups: false, loaded: false };

  it('should return the initial state', () => {
    expect(
      group(undefined, {})
    ).to.deep.equal(sampleState);
  });

  it('should load groups', () => {
    expect(
      group(sampleState, { type: 'LOAD_GROUPS', groups: [{ id: 1, name: 'name' }] })
    ).to.deep.equal({ showGroups: false, groups: [{ id: 1, name: 'name' }], loaded: true });
  });

  it('should update the group name edit store with input', () => {
    expect(
      group(sampleState, { type: 'EDIT_GROUP_NAME', edit: 'some text' })
    ).to.deep.equal({ showGroups: false, loaded: false, edit: 'some text' });
  });

  it('should set a group as selected', () => {
    expect(
      group(sampleState, { type: 'SET_GROUP', groupId: 1 })
    ).to.deep.equal({ showGroups: false, selected: 1, loaded: false });
  });

  it('should toggle show groups', () => {
    expect(
      group(sampleState, { type: 'SHOW_GROUPS' })
    ).to.deep.equal({ showGroups: true, loaded: false });

    expect(
      group({ showGroups: true, loaded: false },  { type: 'SHOW_GROUPS' })
    ).to.deep.equal({ showGroups: false, loaded: false });
  });

  it('should clear the input field on "SHOW_MODAL"', () => {
    expect(
      group({ showGroups: false, loaded: false, edit: 'text' }, { type: 'SHOW_MODAL' })
    ).to.deep.equal({ showGroups: false, loaded: false, edit: '' });
  });

  it('should load specific group info into the store', () => {
    expect(
      group(sampleState, { type: 'SHOW_INFO', info: { some: 'info' } })
    ).to.deep.equal({ showGroups: false, loaded: false, info: { some: 'info' } });
  });

  it('should toggle rights for users', () => {
    expect(
      group(
        {showGroups: false, loaded: false, info: {
          members: [
            { data: { id: 1 }, rights: true },
          ]
        }},
        { type: 'TOGGLE_RIGHTS', id: 1 }
      )
    ).to.deep.equal({
      showGroups: false,
      loaded: false,
      info: {
        members: [{ data: { id: 1 }, rights: false }],
      },
    });
  });
});
