/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
require('dotenv').config({ silent: true });

import 'isomorphic-fetch';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../src/client/App/Actions';
// import * as types from '../../constants/ActionTypes';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  it('should create an action to signal a request was made', () => {
    const expectedAction = {
      type: 'REQUEST_ANNOTATIONS',
    };
    expect(actions.requestAnnotations()).to.deep.equal(expectedAction);
  });

  it('should create an action to load annotations to store', () => {
    const annotations = [{ some: 'annotation' }];
    const expectedAction = {
      type: 'LOAD_ANNOTATIONS',
      annotations,
    };
    expect(actions.loadAnnotations(annotations)).to.deep.equal(expectedAction);
  });

  it('should create an action to delete annotations in store', () => {
    const id = 1;
    const expectedAction = {
      type: 'DELETE_ANNOTATION',
      id,
    };
    expect(actions.deleteAnnotation(id)).to.deep.equal(expectedAction);
  });

  it('should create an action to edit the text of an annotation within the editor', () => {
    const body = 'text';
    const expectedAction = {
      type: 'EDIT_TEXT',
      body,
    };
    expect(actions.editText(body)).to.deep.equal(expectedAction);
  });

  it('should create an action to signal editing of an annotation', () => {
    const id = 1;
    const expectedAction = {
      type: 'EDIT_ANNOTATION',
      id,
    };
    expect(actions.editAnnotation(id)).to.deep.equal(expectedAction);
  });

  it('should create an action to save edit of annotation body', () => {
    const body = 'some text';
    const id = 1;
    const expectedAction = {
      type: 'SAVE_EDIT',
      body,
      id,
    };
    expect(actions.saveEdit(id, body)).to.deep.equal(expectedAction);
  });

  it('should create an action to delete annotation body', () => {
    const id = 1;
    const expectedAction = {
      type: 'DELETE_BODY',
      id,
    };
    expect(actions.deleteBody(id)).to.deep.equal(expectedAction);
  });

  it('should create an action to delete all annotations for a doc for a given user', () => {
    const id = 1;
    const expectedAction = {
      type: 'DELETE_DOC',
      id,
    };
    expect(actions.deleteDoc(id)).to.deep.equal(expectedAction);
  });

  it('should create an action to switch views', () => {
    const expectedAction = {
      type: 'SWITCH_VIEW',
    };
    expect(actions.switchView()).to.deep.equal(expectedAction);
  });

  it('should create an action to delete all annotations for a doc for a given user', () => {
    const userId = 1;
    const expectedAction = {
      type: 'TOGGLE_FOLLOW_USER',
      userId,
    };
    expect(actions.toggleFollowUser(userId)).to.deep.equal(expectedAction);
  });

  it('should create an action to load all users that a user is following', () => {
    const following = [{ some: 'user' }];
    const expectedAction = {
      type: 'LOAD_FOLLOWING',
      following,
    };
    expect(actions.loadFollowing(following)).to.deep.equal(expectedAction);
  });

  it('should create an action to load all groups that a user belongs to', () => {
    const groups = [{ some: 'group' }];
    const expectedAction = {
      type: 'LOAD_GROUPS',
      groups,
    };
    expect(actions.loadGroups(groups)).to.deep.equal(expectedAction);
  });

  it('should create an action to signal showing groups', () => {
    const expectedAction = {
      type: 'SHOW_GROUPS',
    };
    expect(actions.showGroups()).to.deep.equal(expectedAction);
  });

  it('should create an action to set the selected group', () => {
    const groupId = 1;
    const expectedAction = {
      type: 'SET_GROUP',
      groupId,
    };
    expect(actions.setGroup(groupId)).to.deep.equal(expectedAction);
  });

  it('should create an action to edit the group name on creation', () => {
    const edit = 'some name';
    const expectedAction = {
      type: 'EDIT_GROUP_NAME',
      edit,
    };
    expect(actions.editGroup(edit)).to.deep.equal(expectedAction);
  });

  it('should create an action to signal displaying a modal', () => {
    const expectedAction = {
      type: 'SHOW_MODAL',
    };
    expect(actions.showModal()).to.deep.equal(expectedAction);
  });

  it('should create an action to set the current modal', () => {
    const modal = 'Groups';
    const expectedAction = {
      type: 'SET_MODAL',
      modal,
    };
    expect(actions.setModal(modal)).to.deep.equal(expectedAction);
  });

  it('should create an action to signal loading a profile', () => {
    const expectedAction = {
      type: 'LOAD_PROFILE',
    };
    expect(actions.loadProfile()).to.deep.equal(expectedAction);
  });

  it('should create an action to signal exiting a profile', () => {
    const expectedAction = {
      type: 'EXIT_PROFILE',
    };
    expect(actions.exitProfile()).to.deep.equal(expectedAction);
  });

  it('should create an action to load search results', () => {
    const users = [{ some: 'user' }];
    const expectedAction = {
      type: 'LOAD_SEARCH_USERS',
      users,
    };
    expect(actions.loadUserSearchResults(users)).to.deep.equal(expectedAction);
  });

  it('should create an action to select a user', () => {
    const name = 'name';
    const expectedAction = {
      type: 'SELECT_USER',
      name,
    };
    expect(actions.selectUser(name)).to.deep.equal(expectedAction);
  });

  it('should create an action to deselect a user', () => {
    const name = 'name';
    const expectedAction = {
      type: 'DESELECT_USER',
      name,
    };
    expect(actions.deselectUser(name)).to.deep.equal(expectedAction);
  });

  it('should create an action to load invites for a user', () => {
    const invitesArray = [{ some: 'invite' }];
    const expectedAction = {
      type: 'LOAD_INVITES',
      invitesArray,
    };
    expect(actions.loadInvites(invitesArray)).to.deep.equal(expectedAction);
  });

  it('should create an action to remove invites for a user from the store', () => {
    const groupId = 1;
    const expectedAction = {
      type: 'REMOVE_INVITES',
      groupId,
    };
    expect(actions.removeInvites(groupId)).to.deep.equal(expectedAction);
  });

  it('should create an action to load a list of members for a group', () => {
    const info = { some: 'group', info: 'here' };
    const expectedAction = {
      type: 'SHOW_INFO',
      info,
    };
    expect(actions.loadMembers(info)).to.deep.equal(expectedAction);
  });

  it('should create an action to set a user to view', () => {
    const userId = 1;
    const expectedAction = {
      type: 'SET_USER',
      userId,
    };
    expect(actions.setUser(userId)).to.deep.equal(expectedAction);
  });

  it('should create an action to update the privacy settings of an annotation', () => {
    const privacy = true;
    const expectedAction = {
      type: 'UPDATE_PRIVACY',
      privacy,
    };
    expect(actions.updatePrivacy(privacy)).to.deep.equal(expectedAction);
  });

  it('should create an action to assign a group to an existing annotation', () => {
    const groupId = 1;
    const groupName = 'name';
    const expectedAction = {
      type: 'UPDATE_GROUP',
      groupId,
      groupName,
    };
    expect(actions.updateGroup(groupId, groupName)).to.deep.equal(expectedAction);
  });

  it('should create an action to clear search results', () => {
    const expectedAction = {
      type: 'CLEAR_SEARCH',
    };
    expect(actions.clearSearch()).to.deep.equal(expectedAction);
  });

  it('should create an action to update a user\'s title', () => {
    const title = 'title';
    const expectedAction = {
      type: 'UPDATE_TITLE',
      title,
    };
    expect(actions.updateTitle(title)).to.deep.equal(expectedAction);
  });

  it('should create an action to update a user\'s name', () => {
    const name = 'name';
    const expectedAction = {
      type: 'UPDATE_NAME',
      name,
    };
    expect(actions.updateName(name)).to.deep.equal(expectedAction);
  });

  it('should create an action to switch between different lists of annotations', () => {
    const filter = 'filter';
    const expectedAction = {
      type: 'FILTER',
      filter,
    };
    expect(actions.changeFilter(filter)).to.deep.equal(expectedAction);
  });

  it('should create an action to set all annotations for a doc to private for a user', () => {
    const expectedAction = {
      type: 'DOC_PRIVATE',
    };
    expect(actions.setDocPrivate()).to.deep.equal(expectedAction);
  });

  it('should create an action to set all annotations for a doc to public for a user', () => {
    const expectedAction = {
      type: 'DOC_PUBLIC',
    };
    expect(actions.setDocPublic()).to.deep.equal(expectedAction);
  });

  it('should create an action to toggle the admin rights of a user within a group', () => {
    const rights = false;
    const id = 1;
    const expectedAction = {
      type: 'TOGGLE_RIGHTS',
      rights,
      id,
    };
    expect(actions.togglerights(id, rights)).to.deep.equal(expectedAction);
  });
});

xdescribe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates loadAnnotations action upon success', () => {
    const annotations = [{ some: 'annotations' }];
    const expectedActions = [
      { type: 'REQUEST_ANNOTATIONS' },
      { type: 'LOAD_ANNOTATIONS', annotations: [{ some: 'annotations' }] },
    ];
    const store = mockStore({});

    nock('https://localhost:3000')
      .get('/api/annotations')
      .query({ UserId: 1 })
      .reply(200, annotations);

    return store.dispatch(actions.fetchAnnotations(1, null, null, null))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates deleteAnnotation action upon success', () => {
    const expectedActions = [{ type: 'DELETE_ANNOTATION', id: 1 }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .delete('/api/annotations')
      .query({ id: 'someurl' })
      .reply(200);

    return store.dispatch(actions.deleteAnnotationDB(1, 'someurl'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates saveEdit action upon success', () => {
    const expectedActions = [{ type: 'SAVE_EDIT', id: 1, body: 'text' }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .put('/api/annotations')
      .reply(200, [{ some: 'annotation' }]);

    return store.dispatch(actions.editAnnotationDB(1, 'text', false, 1, 'someurl'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates deleteBody action upon success', () => {
    const expectedActions = [{ type: 'DELETE_BODY', id: 1 }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .put('/api/annotations', {
        body: {
          text: null,
        },
        id: 'someurl',
      })
      .reply(200, []);

    return store.dispatch(actions.deleteBodyDB(1, 'someurl'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates deleteDoc action upon success', () => {
    const expectedActions = [{ type: 'DELETE_DOC', id: 1 }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .delete('/api/docs')
      .query({ UserId: 1, DocId: 1 })
      .reply(200);

    return store.dispatch(actions.deleteDocDB(1, 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates toggleFollowUser action upon success', () => {
    const expectedActions = [{ type: 'TOGGLE_FOLLOW_USER', userId: 2 }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .post('/api/follow', {
        id: 1,
        userId: 2,
      })
      .reply(200, { UserId: 1, followsId: 2 });

    return store.dispatch(actions.followUser(2, 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates loadFollowing action upon success', () => {
    const expectedActions = [{ type: 'LOAD_FOLLOWING', following: [{ user: 2 }, { user: 3 }] }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .get('/api/follow')
      .query({ UserId: 1 })
      .reply(200, [{ user: 2 }, { user: 3 }]);

    return store.dispatch(actions.loadFollowingDB(1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('loadGroupsDB creates loadGroups action upon success', () => {
    const expectedActions = [{ type: 'LOAD_GROUPS', groups: [{ group: 1 }, { group: 2 }] }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .get('/api/groups')
      .query({ UserId: 1 })
      .reply(200, [{ group: 1 }, { group: 2 }]);

    return store.dispatch(actions.loadGroupsDB(1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('leaveGroupsDB creates loadGroups action upon success', () => {
    const expectedActions = [{ type: 'LOAD_GROUPS', groups: [{ group: 1 }] }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .delete('/api/groups')
      .query({ UserId: 1, GroupId: 2 })
      .reply(200, [{ group: 1 }]);

    return store.dispatch(actions.leaveGroupDB(2, 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates loadGroupsDB action upon success', () => {
    const expectedActions = [];
    const store = mockStore({});

    nock('https://localhost:3000')
      .post('/api/groups', {
        name: 'Group',
        UserId: 1,
        creator: 'Name',
        otherUsersArray: [2, 3, 4],
      })
      .reply(200, 1)
      .get('/api/groups')
      .query(true)
      .reply(200, [{ group: 1 }]);

    return store.dispatch(actions.createGroup('Group', 1, 'Name', [2, 3, 4]))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates loadUserSearchResults action upon success', () => {
    const expectedActions = [{ type: 'LOAD_SEARCH_USERS', users: [{ some: 'user' }] }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .get('/api/search/users')
      .query({ user: 1, name: 'query' })
      .reply(200, [{ some: 'user' }]);

    return store.dispatch(actions.searchUsers('query', 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates loadInvites action upon success', () => {
    const expectedActions = [{ type: 'LOAD_INVITES', invitesArray: [{ some: 'invite' }] }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .get('/api/invites')
      .query({ user: 1 })
      .reply(200, [{ some: 'invite' }]);

    return store.dispatch(actions.updateInvites(1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates removeInvites action upon success', () => {
    const expectedActions = [{ type: 'REMOVE_INVITES', groupId: 1 }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .post('/api/groups/join', {
        GroupId: 1,
        UserId: 1,
      })
      .reply(200, 1);

    return store.dispatch(actions.acceptInvite(1, 1, true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates loadMembers and showModal actions upon success', () => {
    const expectedActions = [
      { type: 'SET_MODAL', modal: 'members' },
      { type: 'SHOW_INFO', info: { some: 'group', info: 'here' } },
      { type: 'SHOW_MODAL' },
    ];
    const store = mockStore({});

    nock('https://localhost:3000')
      .get('/api/groups/members')
      .query({ GroupId: 1 })
      .reply(200, { some: 'group', info: 'here' });

    return store.dispatch(actions.showMembers(1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates clearSearch action upon success', () => {
    const expectedActions = [{ type: 'CLEAR_SEARCH' }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .post('/api/groups/invite', {
        GroupId: 1,
        creator: 'Name',
        otherUsersArray: [2, 3, 4],
      })
      .reply(200, 'invites sent');

    return store.dispatch(actions.inviteUsers([2, 3, 4], 1, 'Name'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates saveUserToStore action upon success', () => {
    const expectedActions = [{ type: 'SAVE_USER_TO_STORE', data: { user: 'data' } }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .put('/api/users', {
        name: 'name',
        title: 'title',
        id: 1,
      })
      .reply(200, { user: 'data' });

    return store.dispatch(actions.updateProfile('name', 'title', 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates setDocPrivate action upon success', () => {
    const expectedActions = [{ type: 'DOC_PRIVATE' }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .put('/api/annotations/doc', {
        private: true,
        url: 'someurl',
        UserId: 1,
      })
      .reply(200, [1]);

    return store.dispatch(actions.updateDocPrivacy(true, 'someurl', 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates setDocPublic action upon success', () => {
    const expectedActions = [{ type: 'DOC_PUBLIC' }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .put('/api/annotations/doc', {
        private: false,
        url: 'someurl',
        UserId: 1,
      })
      .reply(200, [1]);

    return store.dispatch(actions.updateDocPrivacy(false, 'someurl', 1))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates togglerights action upon success', () => {
    const expectedActions = [{ type: 'TOGGLE_RIGHTS', id: 1, rights: false }];
    const store = mockStore({});

    nock('https://localhost:3000')
      .put('/api/group/users', {
        adminRights: false,
        UserId: 1,
        GroupId: 1,
      })
      .reply(200, [1]);

    return store.dispatch(actions.toggleRights(1, 1, true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
