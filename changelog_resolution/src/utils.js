/**
 * Table row helpers
 */

/** @param {Array} rows */
export const getRows = (rows) => {
  let parsedRows = rows;

  if (typeof parsedRows === 'string') {
    parsedRows = JSON.parse(parsedRows);
  }

  return parsedRows ? parsedRows.filter((row) => !row.deleted) : [];
};

/** @param {Array} rowOrder @param {Array} rows */
export const getRowOrder = (rowOrder, rows) => {
  return rowOrder || getRows(rows).map((row) => row._id);
};

/** @param {Array} rowOrder @param {Array} rows */
export const cleanRowOrder = (rowOrder, rows) => {
  const rowLookup = {};
  rows.forEach((row) => (rowLookup[row._id] = row && !row.deleted));

  return rowOrder.filter(
    (rowId, index) => rowLookup[rowId] && rowId && rowOrder.indexOf(rowId) === index
  );
};

/**
 * Page order helpers
 */

/** @param {Array} pageOrder @param {Array} pages */
export const getPageOrder = (pageOrder, pages) => {
  return pageOrder || pages.map((page) => page._id);
};

/** @param {Array} pageOrder @param {Array} pages */
export const cleanPageOrder = (pageOrder, pages) => {
  const pageLookup = {};
  pages.forEach((page) => (pageLookup[page._id] = page && !page.deleted));

  return pageOrder.filter(
    (pageId, index) => pageLookup[pageId] && pageId && pageOrder.indexOf(pageId) === index
  );
};
