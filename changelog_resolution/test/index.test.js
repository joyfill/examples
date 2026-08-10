'use strict';

import { expect } from 'chai';

import { ChangelogTypes } from '../src/constants.js';
import { applyChangelogsToJoyDoc } from '../index.js';

describe('applyChangelogsToJoyDoc', () => {
  const fileId = 'file-1';
  const pageId1 = 'page-1';
  const fieldId = 'field-1';

  const baseJoyDoc = () => ({
    files: [
      {
        _id: fileId,
        pageOrder: [pageId1],
        pages: [{ _id: pageId1, deleted: false, name: 'P1' }],
        views: [],
      },
    ],
    fields: [
      {
        _id: fieldId,
        file: fileId,
        type: 'table',
        value: [{ _id: 'row-1', deleted: false, cells: { c1: 'a' } }],
        rowOrder: ['row-1'],
      },
    ],
  });

  it('does not mutate the input document', () => {
    const joyDoc = baseJoyDoc();
    const fieldRef = joyDoc.fields[0];
    const filesRef = joyDoc.files;

    const changelogs = [
      {
        target: ChangelogTypes.fieldUpdate,
        fileId,
        fieldId,
        createdOn: 1,
        change: { title: 'T' },
      },
    ];

    const out = applyChangelogsToJoyDoc(joyDoc, changelogs);

    expect(joyDoc.fields[0]).to.equal(fieldRef);
    expect(joyDoc.fields[0].title).to.equal(undefined);
    expect(joyDoc.files).to.equal(filesRef);
    expect(out.fields[0]).to.not.equal(fieldRef);
    expect(out.fields[0].title).to.equal('T');
  });

  it('returns a deep clone when there are no changelogs', () => {
    const joyDoc = baseJoyDoc();
    const out = applyChangelogsToJoyDoc(joyDoc, []);

    expect(out).to.deep.equal(joyDoc);
    expect(out).to.not.equal(joyDoc);
    expect(out.fields[0]).to.not.equal(joyDoc.fields[0]);
  });

  it('applies changelogs in ascending createdOn order', () => {
    const joyDoc = baseJoyDoc();

    const changelogs = [
      {
        target: ChangelogTypes.fieldUpdate,
        fileId,
        fieldId,
        createdOn: 2,
        change: { title: 'After row' },
      },
      {
        target: ChangelogTypes.fieldRowCreate,
        fileId,
        fieldId,
        createdOn: 1,
        change: {
          targetRowIndex: 1,
          row: { _id: 'row-2', deleted: false, cells: {} },
        },
      },
    ];

    const out = applyChangelogsToJoyDoc(joyDoc, changelogs);

    expect(out.fields[0].title).to.equal('After row');
    expect(out.fields[0].rowOrder).to.deep.equal(['row-1', 'row-2']);
    expect(out.fields[0].value.map((r) => r._id)).to.deep.equal(['row-1', 'row-2']);
  });

  it('ignores unknown changelog targets', () => {
    const joyDoc = baseJoyDoc();
    const changelogs = [
      { target: 'not.a.real.target', createdOn: 1, fileId },
    ];

    const out = applyChangelogsToJoyDoc(joyDoc, changelogs);

    expect(out).to.deep.equal(joyDoc);
    expect(out.fields[0]).to.not.equal(joyDoc.fields[0]);
  });

  it('chains page create and field update', () => {
    const joyDoc = baseJoyDoc();
    const newPageId = 'page-new';

    const changelogs = [
      {
        target: ChangelogTypes.pageCreate,
        fileId,
        createdOn: 1,
        change: {
          targetIndex: 1,
          page: { _id: newPageId, fieldPositions: [] },
        },
      },
      {
        target: ChangelogTypes.fieldUpdate,
        fileId,
        fieldId,
        createdOn: 2,
        change: { description: 'd' },
      },
    ];

    const out = applyChangelogsToJoyDoc(joyDoc, changelogs);

    expect(out.files[0].pages.map((p) => p._id)).to.deep.equal([pageId1, newPageId]);
    expect(out.files[0].pageOrder).to.deep.equal([pageId1, newPageId]);
    expect(out.fields[0].description).to.equal('d');
  });
});
