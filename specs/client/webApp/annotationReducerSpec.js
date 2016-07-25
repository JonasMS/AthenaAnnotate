/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import annotations from '../../../src/client/App/Reducers/annotations';

describe('annotation reducer', () => {
  const sampleState = [
    {
      id: 1,
      body: 'text',
      target: 'text',
      doc_id: 1,
      url: 'someurl',
      userName: 'Name',
      userId: 1,
      edit: false,
      deleteFail: false,
    },
  ];

  it('should return the initial state', () => {
    expect(
      annotations(undefined, {})
    ).to.deep.equal([]);
  });

  it('should load annotations', () => {
    expect(
      annotations(undefined, {
        type: 'LOAD_ANNOTATIONS',
        annotations: [
          {
            id: 1,
            text: 'text',
            exact: 'text',
            DocId: 1,
            url: 'someurl',
            User: { name: 'Name', id: 1 },
          },
        ],
      })
    ).to.deep.equal([
      {
        id: 1,
        body: 'text',
        target: 'text',
        doc_id: 1,
        url: 'someurl',
        userName: 'Name',
        userId: 1,
        edit: false,
        deleteFail: false,
      },
    ]);
  });

  it('should delete an annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'DELETE_ANNOTATION',
        id: 1,
      })
    ).to.deep.equal([]);
  });

  it('should not delete an unspecified annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'DELETE_ANNOTATION',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });

  it('should change the edit state of an annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'EDIT_ANNOTATION',
        id: 1,
      })
    ).to.deep.equal([
      {
        id: 1,
        body: 'text',
        target: 'text',
        doc_id: 1,
        url: 'someurl',
        userName: 'Name',
        userId: 1,
        edit: true,
        deleteFail: false,
      },
    ]);
  });

  it('should not change the edit state of an unspecified annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'EDIT_ANNOTATION',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });

  it('should change the body text of an annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'SAVE_EDIT',
        body: 'new text',
        id: 1,
      })
    ).to.deep.equal([
      {
        id: 1,
        body: 'new text',
        target: 'text',
        doc_id: 1,
        url: 'someurl',
        userName: 'Name',
        userId: 1,
        edit: true,
        deleteFail: false,
      },
    ]);
  });

  it('should not change the body of an unspecified annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'SAVE_EDIT',
        body: 'new text',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });

  it('should delete the body of an annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'DELETE_BODY',
        id: 1,
      })
    ).to.deep.equal([
      {
        id: 1,
        body: null,
        target: 'text',
        doc_id: 1,
        url: 'someurl',
        userName: 'Name',
        userId: 1,
        edit: true,
        deleteFail: false,
      },
    ]);
  });

  it('should not delete the body of an unspecified annotation', () => {
    expect(
      annotations(sampleState, {
        type: 'DELETE_BODY',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });
});
