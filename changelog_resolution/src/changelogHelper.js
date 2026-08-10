import { DOCUMENT_FILE_FIELD_UPDATE_PATHS } from './constants.js';
import { getRowOrder, cleanRowOrder, getPageOrder, cleanPageOrder } from './utils.js';

/**
 * Sort changelogs by createdOn ascending (oldest first).
 *
 * @param {Array} changelogs
 * @returns {Array}
 */
export const sortChangelogs = (changelogs) => {
  return [...changelogs].sort((a, b) => a.createdOn - b.createdOn);
};

export const handlePageCreateForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { view, fileId, change } = changelog;
  const { page, targetIndex } = change;

  const fileIndex = joySpecDocument.files.findIndex(
    (file) => file._id.toString() === fileId.toString()
  );

  if (fileIndex === -1) return joySpecDocument;

  if (!view) {
    joySpecDocument.files[fileIndex].pageOrder = getPageOrder(
      joySpecDocument.files[fileIndex].pageOrder,
      joySpecDocument.files[fileIndex].pages
    );
    joySpecDocument.files[fileIndex].pageOrder = cleanPageOrder(
      joySpecDocument.files[fileIndex].pageOrder,
      joySpecDocument.files[fileIndex].pages
    );

    joySpecDocument.files[fileIndex].pageOrder.splice(targetIndex, 0, page._id);
    joySpecDocument.files[fileIndex].pages.push(page);
  } else if (view) {
    const viewIndex =
      !joySpecDocument.files[fileIndex].views ||
      joySpecDocument.files[fileIndex].views.length < 1
        ? -1
        : joySpecDocument.files[fileIndex].views.findIndex((v) => v.type === view);

    if (viewIndex === -1) return joySpecDocument;

    joySpecDocument.files[fileIndex].views[viewIndex].pageOrder = getPageOrder(
      joySpecDocument.files[fileIndex].views[viewIndex].pageOrder,
      joySpecDocument.files[fileIndex].views[viewIndex].pages
    );
    joySpecDocument.files[fileIndex].views[viewIndex].pageOrder = cleanPageOrder(
      joySpecDocument.files[fileIndex].views[viewIndex].pageOrder,
      joySpecDocument.files[fileIndex].views[viewIndex].pages
    );

    joySpecDocument.files[fileIndex].views[viewIndex].pageOrder.splice(
      targetIndex,
      0,
      page._id
    );
    joySpecDocument.files[fileIndex].views[viewIndex].pages.push(page);
  }

  return joySpecDocument;
};

export const handlePageDeleteForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { view, fileId, pageId } = changelog;

  const fileIndex = joySpecDocument.files.findIndex((file) => file._id.toString() === fileId);

  if (fileIndex === -1) return joySpecDocument;

  if (!view) {
    if (joySpecDocument.files[fileIndex].pages.length < 2) return joySpecDocument;

    const pageIndex = joySpecDocument.files[fileIndex].pages.findIndex(
      (page) => pageId.toString() === page._id.toString()
    );
    if (pageIndex !== -1) joySpecDocument.files[fileIndex].pages.splice(pageIndex, 1);

    joySpecDocument.files[fileIndex].pageOrder = getPageOrder(
      joySpecDocument.files[fileIndex].pageOrder,
      joySpecDocument.files[fileIndex].pages
    );
    joySpecDocument.files[fileIndex].pageOrder = cleanPageOrder(
      joySpecDocument.files[fileIndex].pageOrder,
      joySpecDocument.files[fileIndex].pages
    );
  } else if (view) {
    const viewIndex =
      !joySpecDocument.files[fileIndex].views ||
      joySpecDocument.files[fileIndex].views.length < 1
        ? -1
        : joySpecDocument.files[fileIndex].views.findIndex((v) => v.type === view);

    if (viewIndex === -1) return joySpecDocument;

    if (joySpecDocument.files[fileIndex].views[viewIndex].pages.length < 2)
      return joySpecDocument;

    const pageIndex = joySpecDocument.files[fileIndex].views[viewIndex].pages.findIndex(
      (page) => pageId.toString() === page._id.toString()
    );
    if (pageIndex !== -1)
      joySpecDocument.files[fileIndex].views[viewIndex].pages.splice(pageIndex, 1);

    joySpecDocument.files[fileIndex].views[viewIndex].pageOrder = getPageOrder(
      joySpecDocument.files[fileIndex].views[viewIndex].pageOrder,
      joySpecDocument.files[fileIndex].views[viewIndex].pages
    );
    joySpecDocument.files[fileIndex].views[viewIndex].pageOrder = cleanPageOrder(
      joySpecDocument.files[fileIndex].views[viewIndex].pageOrder,
      joySpecDocument.files[fileIndex].views[viewIndex].pages
    );
  }

  return joySpecDocument;
};

export const handleFieldCreateForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { fileId, change } = changelog;
  const newField = change;

  const fileIndex = joySpecDocument.files.findIndex((file) => file._id.toString() === fileId);

  if (fileIndex === -1) return joySpecDocument;

  const fieldIndex = joySpecDocument.fields.findIndex(
    (field) => field._id.toString() === newField._id && field.file.toString() === fileId
  );

  if (fieldIndex === -1) {
    joySpecDocument.fields.push(newField);
  } else {
    joySpecDocument.fields[fieldIndex] = {
      ...joySpecDocument.fields[fieldIndex],
      ...newField,
    };
  }

  return joySpecDocument;
};

export const handleFieldUpdateForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { fileId, fieldId, change } = changelog;

  const fieldIndex = joySpecDocument.fields.findIndex(
    (field) => field._id.toString() === fieldId && field.file.toString() === fileId
  );

  if (fieldIndex === -1) return joySpecDocument;

  const fieldChanges = {};
  Object.keys(change).forEach((key) => {
    if (DOCUMENT_FILE_FIELD_UPDATE_PATHS[key]) fieldChanges[key] = change[key];
  });

  joySpecDocument.fields[fieldIndex] = {
    ...joySpecDocument.fields[fieldIndex],
    ...fieldChanges,
  };

  return joySpecDocument;
};

export const handleFieldRowCreateForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { fileId, fieldId, change } = changelog;
  const { targetRowIndex, row } = change;

  const fieldIndex = joySpecDocument.fields.findIndex(
    (field) => field._id.toString() === fieldId && field.file.toString() === fileId
  );

  if (fieldIndex === -1) return joySpecDocument;

  const field = joySpecDocument.fields[fieldIndex];

  const nextRows = [...field.value];
  const nextRowOrder = [...getRowOrder(field.rowOrder, nextRows)];

  nextRowOrder.splice(targetRowIndex, 0, row._id);
  nextRows.push(row);

  joySpecDocument.fields[fieldIndex] = {
    ...field,
    value: nextRows,
    rowOrder: cleanRowOrder(nextRowOrder, nextRows),
  };

  return joySpecDocument;
};

export const handleFieldRowMoveForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { fileId, fieldId, change } = changelog;
  const { targetRowIndex, rowId } = change;

  const fieldIndex = joySpecDocument.fields.findIndex(
    (field) => field._id.toString() === fieldId && field.file.toString() === fileId
  );

  if (fieldIndex === -1) return joySpecDocument;

  const field = joySpecDocument.fields[fieldIndex];

  const nextRows = [...field.value];
  const nextRowOrder = [...getRowOrder(field.rowOrder, nextRows)];
  const rowIndex = nextRowOrder.findIndex((rowOrderId) => rowOrderId === rowId);

  if (rowIndex === -1) return joySpecDocument;

  nextRowOrder[rowIndex] = nextRowOrder.splice(targetRowIndex, 1, nextRowOrder[rowIndex])[0];

  joySpecDocument.fields[fieldIndex] = {
    ...field,
    rowOrder: cleanRowOrder(nextRowOrder, nextRows),
  };

  return joySpecDocument;
};

export const handleFieldRowDeleteForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { fileId, fieldId, change } = changelog;
  const { rowId } = change;

  const fieldIndex = joySpecDocument.fields.findIndex(
    (field) => field._id.toString() === fieldId && field.file.toString() === fileId
  );

  if (fieldIndex === -1) return joySpecDocument;

  const field = joySpecDocument.fields[fieldIndex];

  const nextRowOrder = [...getRowOrder(field.rowOrder, field.value)];
  const rowIndex = nextRowOrder.findIndex((rowOrderId) => rowOrderId === rowId);
  if (rowIndex !== -1) nextRowOrder.splice(rowIndex, 1);

  const nextRows = [...field.value];
  const valueRowObjectIndex = nextRows.findIndex((row) => row._id === rowId);
  if (valueRowObjectIndex !== -1)
    nextRows[valueRowObjectIndex] = { ...nextRows[valueRowObjectIndex], deleted: true };

  joySpecDocument.fields[fieldIndex] = {
    ...field,
    value: nextRows,
    rowOrder: cleanRowOrder(nextRowOrder, nextRows),
  };

  return joySpecDocument;
};

export const handleFieldRowUpdateForJoySpecDocumentv1 = (joySpecDocument, changelog) => {
  const { fileId, fieldId, change } = changelog;
  const { rowId, row } = change;

  const fieldIndex = joySpecDocument.fields.findIndex(
    (field) => field._id.toString() === fieldId && field.file.toString() === fileId
  );

  if (fieldIndex === -1) return joySpecDocument;

  const field = joySpecDocument.fields[fieldIndex];

  const nextRows = [...field.value];
  const rowIndex = nextRows.findIndex((r) => r._id === rowId);

  if (rowIndex === -1) return joySpecDocument;

  const nextRow = row || {};
  const nextCells = nextRow.cells || {};

  nextRows[rowIndex] = {
    ...nextRows[rowIndex],
    ...nextRow,
    cells: {
      ...nextRows[rowIndex].cells,
      ...nextCells,
    },
  };

  joySpecDocument.fields[fieldIndex] = { ...field, value: nextRows };

  return joySpecDocument;
};
