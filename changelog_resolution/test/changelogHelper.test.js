'use strict';

import { expect } from 'chai';

import {
  ChangelogTypes,
  FieldTypes,
  FieldPositionTypes,
  FieldTableColumnTypes,
} from '../src/constants.js';

const FieldDisplayTypes = FieldPositionTypes.displayTypes;

import {
  sortChangelogs,
  handlePageCreateForJoySpecDocumentv1,
  handlePageDeleteForJoySpecDocumentv1,
  handleFieldCreateForJoySpecDocumentv1,
  handleFieldUpdateForJoySpecDocumentv1,
  handleFieldRowDeleteForJoySpecDocumentv1,
  handleFieldRowCreateForJoySpecDocumentv1,
  handleFieldRowMoveForJoySpecDocumentv1,
  handleFieldRowUpdateForJoySpecDocumentv1,
} from '../src/changelogHelper.js';

export const defaultOptions = [
  { _id: 'opt1', value: 'Option 1' },
  { _id: 'opt2', value: 'Option 2 Example value' },
  { _id: 'opt3', value: 'Option 3 Example value with a really long value for this one yo! It will propably need to wrap.' },
  { _id: 'opt4', value: 'Option 4', deleted: true },
];

export const defaultColumns = [
  {
    _id: 'col1',
    identifier: 'textColumnIdentifier',
    title: 'Text Column',
    width: 180,
    type: FieldTableColumnTypes.text,
    deleted: false
  },
  {
    _id: 'col2',
    identifier: 'dropdownColumnIdentifier',
    title: 'Dropdown Column',
    width: 200,
    type: FieldTableColumnTypes.dropdown,
    deleted: false,
    options: defaultOptions,
  },
];

export const defaultRows = [
  {
    _id: 'row1',
    cells: {
      col1: '=A2+C1',
      col2: 'opt1',
    }
  },
  {
    _id: 'row2',
    cells: {
      col1: '2',
      col2: 'opt1',
    }
  },
];

export const JoySpecFieldPositions = [
  {
    type: FieldTypes.date,
    _id: 'fieldPosition1Id',
    field: 'dateId',
    displayType: FieldDisplayTypes.original,
    x: 0,
    y: 0,
    width: 6,
    height: 8,
    fontSize: 12,
  },
  {
    type: FieldTypes.table,
    columnType: FieldTableColumnTypes.dropdown,
    _id: 'fieldPosition2Id',
    field: 'tableId',
    displayType: FieldDisplayTypes.check,
    rowIndex: 0,
    column: 'col1',
    x: 0,
    y: 0,
    width: 6,
    height: 8,
    fontSize: 12,
  },
];

const JoySpecFields = [
 {
    file: 'File1Id',
    _id: 'dateId',
    title: 'Example Title',
    type: FieldTypes.date,
    value: 1669664460364,
  },
  {
    file: 'File1Id',
    _id: 'tableId',
    title: 'Example 2 Title',
    type: FieldTypes.table,
    tableColumns: defaultColumns,
    value: defaultRows,
    rowOrder: ['row2', 'row1']
  },
];

export const JoySpecDocument = {
  _id: 'TestId',
  identifier: 'documentIdentifier',
  name: 'Test Name',
  files: [
    {
      _id: 'File1Id',
      name: 'File 1 Name',
      pages: [
        {
          _id: 'page1',
          name: 'Page 1 Name',
          fieldPositions: JoySpecFieldPositions,
        },
        {
          _id: 'page2',
          name: 'Page 2 Name',
          fieldPositions: JoySpecFieldPositions,
        },
      ],
      views: [{
        _id: 'viewId',
        type: 'mobile',
        pages: [
          {
            _id: 'page1',
            name: 'Page 1 Name',
            fieldPositions: JoySpecFieldPositions,
          },
          {
            _id: 'page2',
            name: 'Page 2 Name',
            fieldPositions: JoySpecFieldPositions,
          },
        ],
      }]
    },
  ],
  fields: JoySpecFields,
};

describe('changelogHelper', () => {

  describe('handlePageCreateForJoySpecDocumentv1', () => {

    it('should create new page for primary view with no pageOrder', () => {

      const result = handlePageCreateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.pageCreate,
          fileId: 'File1Id',
          change: {
            targetIndex: 1,
            page: { _id: 'newPageId', fieldPositions: [] }
          }
        }
      );

      expect(result.files[0].pages.length).to.equal(3);
      expect(result.files[0].pages[2]._id).to.equal('newPageId');
      expect(result.files[0].pages.map((p) => p._id)).to.deep.equal(['page1', 'page2', 'newPageId']);
      expect(result.files[0].pageOrder).to.deep.equal(['page1', 'newPageId', 'page2']);

      //Should not impact alternative views
      expect(result.files[0].views[0].pages.length).to.equal(2);

    });

    it('should create new page for primary view with a valid pageOrder', () => {

      const nextJoySpecDocument = JSON.parse(JSON.stringify(JoySpecDocument));

      /**
       * 1. Should remove any ids assoicated with non-existent pages.
       * 2. Should remove any invalid (undefined, null, etc.)
       */
      nextJoySpecDocument.files[0].pageOrder = [100, 'page2', 'page1', 'invalid', undefined];

      const result = handlePageCreateForJoySpecDocumentv1(
        nextJoySpecDocument,
        {
          target: ChangelogTypes.pageCreate,
          fileId: 'File1Id',
          change: {
            targetIndex: 1,
            page: { _id: 'newPageId', fieldPositions: [] }
          }
        }
      );

      expect(result.files[0].pages.length).to.equal(3);
      expect(result.files[0].pages[2]._id).to.equal('newPageId');
      expect(result.files[0].pages.map((p) => p._id)).to.deep.equal(['page1', 'page2', 'newPageId']);
      expect(result.files[0].pageOrder).to.deep.equal(['page2', 'newPageId', 'page1']);

    });

    it('should create new page for alternative view with no pageOrder', () => {

      const result = handlePageCreateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.pageCreate,
          fileId: 'File1Id',
          view: 'mobile',
          change: {
            targetIndex: 1,
            page: { _id: 'newPageId', fieldPositions: [] }
          }
        }
      );

      expect(result.files[0].views[0].pages.length).to.equal(3);
      expect(result.files[0].views[0].pages[2]._id).to.equal('newPageId');
      expect(result.files[0].views[0].pages.map((p) => p._id)).to.deep.equal(['page1', 'page2', 'newPageId']);
      expect(result.files[0].views[0].pageOrder).to.deep.equal(['page1', 'newPageId', 'page2']);

      //Should not impact primary view
      expect(result.files[0].pages.length).to.equal(2);

    });

    it('should create new page for alternative view with a valid pageOrder', () => {

      const nextJoySpecDocument = JSON.parse(JSON.stringify(JoySpecDocument));

      /**
       * 1. Should remove any ids assoicated with non-existent pages.
       * 2. Should remove any invalid (undefined, null, etc.)
       */
      nextJoySpecDocument.files[0].views[0].pageOrder = [100, null, 'page2', 'invalid', 'page1'];

      const result = handlePageCreateForJoySpecDocumentv1(
        nextJoySpecDocument,
        {
          target: ChangelogTypes.pageCreate,
          fileId: 'File1Id',
          view: 'mobile',
          change: {
            targetIndex: 1,
            page: { _id: 'newPageId', fieldPositions: [] }
          }
        }
      );

      expect(result.files[0].views[0].pages.length).to.equal(3);
      expect(result.files[0].views[0].pages[2]._id).to.equal('newPageId');
      expect(result.files[0].views[0].pages.map((p) => p._id)).to.deep.equal(['page1', 'page2', 'newPageId']);
      expect(result.files[0].views[0].pageOrder).to.deep.equal(['page2', 'newPageId', 'page1']);

    });

  });

  describe('handlePageDeleteForJoySpecDocumentv1', () => {

    it('should delete page for primary view with no pageOrder', () => {

      const result = handlePageDeleteForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.pageDelete,
          fileId: 'File1Id',
          pageId: 'page1'
        }
      );

      expect(result.files[0].pages.length).to.equal(1);
      expect(result.files[0].pages[0]._id).to.equal('page2');
      expect(result.files[0].pages.map((p) => p._id)).to.deep.equal(['page2']);
      expect(result.files[0].pageOrder).to.deep.equal(['page2']);

      //Should not impact alternative views
      expect(result.files[0].views[0].pages.length).to.equal(2);

    });

    it('should delete page for primary view with a valid pageOrder', () => {

      const nextJoySpecDocument = JSON.parse(JSON.stringify(JoySpecDocument));

      /**
       * 1. Should remove any ids assoicated with non-existent pages.
       * 2. Should remove any invalid (undefined, null, etc.)
       * 3. Should remove the pageId being deleted
       */
      nextJoySpecDocument.files[0].pageOrder = [100, 'page2', 'page1', 'invalid', undefined];

      const result = handlePageDeleteForJoySpecDocumentv1(
        nextJoySpecDocument,
        {
          target: ChangelogTypes.pageDelete,
          fileId: 'File1Id',
          pageId: 'page1',
        }
      );

      expect(result.files[0].pages.length).to.equal(1);
      expect(result.files[0].pages[0]._id).to.equal('page2');
      expect(result.files[0].pages.map((p) => p._id)).to.deep.equal(['page2']);
      expect(result.files[0].pageOrder).to.deep.equal(['page2']);

    });

    it('should not delete last page for primary view', () => {

      const nextJoySpecDocument = JSON.parse(JSON.stringify(JoySpecDocument));
      nextJoySpecDocument.files[0].pageOrder = ['page1'];
      nextJoySpecDocument.files[0].pages = [{ _id: 'page1', name: 'Page 1 Name', fieldPositions: JoySpecFieldPositions }];

      const result = handlePageDeleteForJoySpecDocumentv1(
        nextJoySpecDocument,
        {
          target: ChangelogTypes.pageDelete,
          fileId: 'File1Id',
          pageId: 'page1',
        }
      );

      expect(result.files[0].pages.length).to.equal(1);
      expect(result.files[0].pages[0]._id).to.equal('page1');
      expect(result.files[0].pages.map((p) => p._id)).to.deep.equal(['page1']);
      expect(result.files[0].pageOrder).to.deep.equal(['page1']);

    });

    it('should delete page for alternative view with no pageOrder', () => {

      const result = handlePageDeleteForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.pageDelete,
          fileId: 'File1Id',
          view: 'mobile',
          pageId: 'page1',
        }
      );

      expect(result.files[0].views[0].pages.length).to.equal(1);
      expect(result.files[0].views[0].pages[0]._id).to.equal('page2');
      expect(result.files[0].views[0].pages.map((p) => p._id)).to.deep.equal(['page2']);
      expect(result.files[0].views[0].pageOrder).to.deep.equal(['page2']);

      //Should not impact primary view
      expect(result.files[0].pages.length).to.equal(2);


    });

    it('should delete page for alternative view with a valid pageOrder', () => {

      const nextJoySpecDocument = JSON.parse(JSON.stringify(JoySpecDocument));

      /**
       * 1. Should remove any ids assoicated with non-existent pages.
       * 2. Should remove any invalid (undefined, null, etc.)
       * 3. Should remove the pageId being deleted
       */
      nextJoySpecDocument.files[0].views[0].pageOrder = [100, null, 'page2', 'invalid', 'page1'];

      const result = handlePageDeleteForJoySpecDocumentv1(
        nextJoySpecDocument,
        {
          target: ChangelogTypes.pageDelete,
          fileId: 'File1Id',
          view: 'mobile',
          pageId: 'page1',
        }
      );

      expect(result.files[0].views[0].pages.length).to.equal(1);
      expect(result.files[0].views[0].pages[0]._id).to.equal('page2');
      expect(result.files[0].views[0].pages.map((p) => p._id)).to.deep.equal(['page2']);
      expect(result.files[0].views[0].pageOrder).to.deep.equal(['page2']);

    });

    it('should not delete last page for alternative view', () => {

      const nextJoySpecDocument = JSON.parse(JSON.stringify(JoySpecDocument));
      nextJoySpecDocument.files[0].views[0].pageOrder = ['page1'];
      nextJoySpecDocument.files[0].views[0].pages = [{ _id: 'page1', name: 'Page 1 Name', fieldPositions: JoySpecFieldPositions }];

      const result = handlePageDeleteForJoySpecDocumentv1(
        nextJoySpecDocument,
        {
          target: ChangelogTypes.pageDelete,
          view: 'mobile',
          fileId: 'File1Id',
          pageId: 'page1',
        }
      );

      expect(result.files[0].views[0].pages.length).to.equal(1);
      expect(result.files[0].views[0].pages[0]._id).to.equal('page1');
      expect(result.files[0].views[0].pages.map((p) => p._id)).to.deep.equal(['page1']);
      expect(result.files[0].views[0].pageOrder).to.deep.equal(['page1']);

    });


  });

  describe('handleFieldCreateForJoySpecDocumentv1', () => {

    it('should create new field if it does not already exist', () => {

      const newField = {
        file: 'File1Id',
        _id: 'textId',
        title: 'Updated',
        value: 'hello',
      };

      const result = handleFieldCreateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldCreate,
          fileId: 'File1Id',
          change: newField
        }
      );

      expect(result.fields.length).to.equal(3);
      expect(result.fields[2]).to.deep.equal(newField);

    });

    it('should merge if field already exists', () => {

      const newField = {
        file: 'File1Id',
        _id: 'dateId',
        title: 'Merged',
      };

      const result = handleFieldCreateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldCreate,
          fileId: 'File1Id',
          change: newField
        }
      );

      expect(result.fields.length).to.equal(2);
      expect(result.fields[0]).to.deep.equal({
        file: 'File1Id',
        _id: 'dateId',
        title: 'Merged',
        type: FieldTypes.date,
        value: 1669664460364,
      });

    });

  });

  describe('handleFieldUpdateForJoySpecDocumentv1', () => {

    it('should update target field', () => {

      const result = handleFieldUpdateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldUpdate,
          fileId: 'File1Id',
          fieldId: 'dateId',
          change: {
            title: 'Updated',
            value: 100,
          }
        }
      );

      expect(result.fields[0].title).to.equal('Updated');
      expect(result.fields[0].value).to.equal(100);

    });

  });

  describe('handleFieldRowDeleteForJoySpecDocumentv1', () => {

    it('should delete row from target field', () => {

      const result = handleFieldRowDeleteForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldRowDelete,
          fileId: 'File1Id',
          fieldId: 'tableId',
          change: {
            rowId: 'row2',
          }
        }
      );

      expect(result.fields[1].value[1].deleted).to.equal(true);
      expect(result.fields[1].value.length).to.equal(2);
      expect(result.fields[1].rowOrder).to.deep.equal(['row1']);

    });

  });

  describe('handleFieldRowMoveForJoySpecDocumentv1', () => {

    it('should move rowId to targetIndex for target field', () => {

      const result = handleFieldRowMoveForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldRowDelete,
          fileId: 'File1Id',
          fieldId: 'tableId',
          change: {
            rowId: 'row2',
            targetRowIndex: 0
          }
        }
      );

      expect(result.fields[1].value.length).to.equal(2);
      expect(result.fields[1].rowOrder).to.deep.equal(['row2', 'row1']);

    });

  });

  describe('handleFieldRowCreateForJoySpecDocumentv1', () => {

    it('should create row for target field', () => {

      const result = handleFieldRowCreateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldRowUpdate,
          fileId: 'File1Id',
          fieldId: 'tableId',
          change: {
            targetRowIndex: 1,
            row: { _id: 'row3', cells: {'col1': 'updated'}}
          }
        }
      );

      expect(result.fields[1].value[2]).to.deep.equal({ _id: 'row3', cells: {'col1': 'updated'}});
      expect(result.fields[1].value.length).to.equal(3);
      expect(result.fields[1].rowOrder).to.deep.equal(['row2', 'row3', 'row1']);

    });

  });

  describe('handleFieldRowUpdateForJoySpecDocumentv1', () => {

    it('should update row for target field', () => {

      const result = handleFieldRowUpdateForJoySpecDocumentv1(
        JSON.parse(JSON.stringify(JoySpecDocument)),
        {
          target: ChangelogTypes.fieldRowUpdate,
          fileId: 'File1Id',
          fieldId: 'tableId',
          change: {
            rowId: 'row2',
            row: { _id: 'row2', cells: {'col1': 'updated'}}
          }
        }
      );

      expect(result.fields[1].value[1]).to.deep.equal({ _id: 'row2', cells: {'col1': 'updated', 'col2': 'opt1'}});
      expect(result.fields[1].value.length).to.equal(2);
      expect(result.fields[1].rowOrder.length).to.equal(2);

    });

  });

  describe('sortChangelogs', () => {

    it('should sort createOn in ascending order', () => {

      const result = sortChangelogs([
        { createdOn: 3 },
        { createdOn: 2 },
        { createdOn: 1 },
      ]);

      expect(result).to.deep.equal([
        { createdOn: 1 },
        { createdOn: 2 },
        { createdOn: 3 },
      ]);

    });

  });

});
