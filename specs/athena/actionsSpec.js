/* global describe it xdescribe xit afterEach */
import 'isomorphic-fetch';
import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import cfgMockStore from 'redux-mock-store';
import * as actions from '../../src/libs/athena/src/actions';
import * as types from '../../src/libs/athena/src/constants/actionTypes';

const mockStore = cfgMockStore([thunk]);

describe('Athena Action Creators', () => {
  describe('failedRequest', () => {
    it('it should be a function', () => {
      expect(actions.failedRequest).to.be.a('function');
    });

    it('should return an object', () => {
      const error = { value: '0' };
      const result = actions.failedRequest(error);
      const expected = { type: types.ERR_FAILED_REQUEST, data: error };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('saveUserToStore', () => {
    it('it should be a function', () => {
      expect(actions.saveUserToStore).to.be.a('function');
    });

    it('should return an object', () => {
      const user = { value: '0' };
      const result = actions.saveUserToStore(user);
      const expected = { type: types.SAVE_USER_TO_STORE, data: user };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('getUserFromDB', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('it should be a function', () => {
      expect(actions.getUserFromDB).to.be.a('function');
    });

    it('should create SAVE_USER_TO_STORE action after fetching a user is done', () => {
      const store = mockStore({});
      const user = { name: 'joe' };
      const expectedActions = [{ type: types.SAVE_USER_TO_STORE, data: user }];

      nock('https://localhost:3000')
        .post('/api/users', user)
        .reply(200, user);

      return store.dispatch(actions.getUserFromDB(user))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });

  describe('setModify', () => {
    it('it should be a function', () => {
      expect(actions.setModify).to.be.a('function');
    });

    it('should return an object', () => {
      const result = actions.setModify(false);
      const expected = { type: types.SET_WIDGET_MODIFY, isOnModify: false };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('updateBody', () => {
    it('it should be a function', () => {
      expect(actions.updateBody).to.be.a('function');
    });

    it('should return an object', () => {
      const text = { value: '0' };
      const result = actions.updateBody(text);
      const expected = { type: types.UPDATE_BODY, text };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('clearAnnote', () => {
    it('it should be a function', () => {
      expect(actions.clearAnnote).to.be.a('function');
    });

    it('should return an object', () => {
      const result = actions.clearAnnote();
      const expected = { type: types.CLEAR_ANNOTATION };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('setAnnoteGroup', () => {
    it('it should be a function', () => {
      expect(actions.setAnnoteGroup).to.be.a('function');
    });

    it('should return an object', () => {
      const groupId = { value: '0' };
      const result = actions.setAnnoteGroup(groupId);
      const expected = { type: types.SET_GROUP, groupId };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('setAnnote', () => {
    it('it should be a function', () => {
      expect(actions.setAnnote).to.be.a('function');
    });

    it('should return an object', () => {
      const annote = { value: '0' };
      const result = actions.setAnnote(annote);
      const expected = { type: types.SET_ANNOTATION, annote };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('addAnnote', () => {
    it('it should be a function', () => {
      expect(actions.addAnnote).to.be.a('function');
    });

    it('should return an object', () => {
      const annote = { value: '0' };
      const result = actions.addAnnote(annote);
      const expected = { type: types.ADD_ANNOTATION, annote };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('setCurrentChannel', () => {
    it('it should be a function', () => {
      expect(actions.setCurrentChannel).to.be.a('function');
    });

    it('should return an object', () => {
      const current = { value: '0' };
      const result = actions.setCurrentChannel(current);
      const expected = { type: types.SET_CURRENT_CHANNEL, current };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('setChannels', () => {
    it('it should be a function', () => {
      expect(actions.setChannels).to.be.a('function');
    });

    it('should return an object', () => {
      const channels = { value: '0' };
      const result = actions.setChannels(channels);
      const expected = { type: types.SET_CHANNELS, channels };

      expect(result).to.deep.equal(expected);
    });
  });
});
