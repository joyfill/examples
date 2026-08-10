import { ChangelogTypes } from '../src/constants.js';
import { applyChangelogsToJoyDoc } from '../index.js';

const fileId = 'file-1';
const pageId1 = 'page-1';
const pageId2 = 'page-2';
const fieldId = 'field-1';

const joySpec = {
  files: [
    {
      _id: fileId,
      pageOrder: [pageId1],
      pages: [{ _id: pageId1, deleted: false }],
      views: [],
    },
  ],
  fields: [
    {
      _id: fieldId,
      file: fileId,
      type: 'table',
      value: [{ _id: 'row-1', deleted: false, cells: {} }],
      rowOrder: ['row-1'],
    },
  ],
};

const changelogs = [
  {
    target: ChangelogTypes.fieldUpdate,
    fileId,
    fieldId,
    createdOn: 2,
    change: { title: 'Updated title' },
  },
  {
    target: ChangelogTypes.fieldRowCreate,
    fileId,
    fieldId,
    createdOn: 1,
    change: {
      targetRowIndex: 1,
      row: { _id: 'row-2', deleted: false, cells: { a: { value: 'x' } } },
    },
  },
];

const originalTitle = joySpec.fields[0].title;
const out = applyChangelogsToJoyDoc(joySpec, changelogs);

console.log('Input unchanged:', joySpec.fields[0].title === originalTitle);
console.log('Output title:', out.fields[0].title);
console.log('Output rowOrder:', out.fields[0].rowOrder);
console.log('Output row ids:', out.fields[0].value.map((r) => r._id));
