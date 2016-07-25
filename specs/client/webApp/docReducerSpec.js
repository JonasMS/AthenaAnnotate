/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import docs from '../../../src/client/App/Reducers/docs';

describe('annotation reducer', () => {
  const sampleState = [
    {
      id: 1,
      url: 'someurl',
      image: undefined,
      title: undefined,
      baseUrl: undefined,
      count: 1,
    },
  ];

  it('should return the initial state', () => {
    expect(
      docs(undefined, {})
    ).to.deep.equal([]);
  });

  it('should load docs', () => {
    expect(
      docs(undefined, {
        type: 'LOAD_ANNOTATIONS',
        annotations: [
          {
            id: 1,
            text: 'text',
            exact: 'text',
            DocId: 1,
            url: 'someurl',
            User: { name: 'Name', id: 1 },
            Doc: { id: 1, url: 'someurl' },
          },
        ],
      })
    ).to.deep.equal([
      {
        id: 1,
        url: 'someurl',
        image: undefined,
        title: undefined,
        baseUrl: undefined,
        count: 1,
      },
    ]);
  });

  it('should delete a doc from the store', () => {
    expect(
      docs(sampleState, {
        type: 'DELETE_DOC',
        id: 1,
      })
    ).to.deep.equal([]);
  });

  it('should not delete an unspecified annotation', () => {
    expect(
      docs(sampleState, {
        type: 'DELETE_DOC',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });

  it('should change the privacy state of an annotation to private', () => {
    expect(
      docs(sampleState, {
        type: 'DOC_PRIVATE',
        id: 1,
      })
    ).to.deep.equal([
      {
        id: 1,
        url: 'someurl',
        image: undefined,
        title: undefined,
        baseUrl: undefined,
        count: 1,
        privacy: true,
      },
    ]);
  });

  it('should not change the privacy state of an unspecified annotation', () => {
    expect(
      docs(sampleState, {
        type: 'DOC_PRIVATE',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });

  it('should change the privacy state of an annotation to public', () => {
    expect(
      docs(sampleState, {
        type: 'DOC_PUBLIC',
        id: 1,
      })
    ).to.deep.equal([
      {
        id: 1,
        url: 'someurl',
        image: undefined,
        title: undefined,
        baseUrl: undefined,
        count: 1,
        privacy: false,
      },
    ]);
  });

  it('should not change the privacy state of an unspecified annotation', () => {
    expect(
      docs(sampleState, {
        type: 'DOC_PUBLIC',
        id: 2,
      })
    ).to.deep.equal(sampleState);
  });
});
