/** Changelog `target` values */
export const ChangelogTypes = {
  fileUpdate: 'file.update',
  pageCreate: 'page.create',
  pageUpdate: 'page.update',
  pageDelete: 'page.delete',
  fieldPositionCreate: 'fieldPosition.create',
  fieldPositionUpdate: 'fieldPosition.update',
  fieldPositionDelete: 'fieldPosition.delete',
  fieldCreate: 'field.create',
  fieldUpdate: 'field.update',
  fieldDelete: 'field.delete',
  fieldRowCreate: 'field.value.rowCreate',
  fieldRowUpdate: 'field.value.rowUpdate',
  fieldRowMove: 'field.value.rowMove',
  fieldRowDelete: 'field.value.rowDelete',
};
ChangelogTypes.all = Object.keys(ChangelogTypes).map((key) => ChangelogTypes[key]);

/** Document field `type` strings */
export const FieldTypes = {
  richText: 'richText',
  image: 'image',
  block: 'block',
  text: 'text',
  textarea: 'textarea',
  number: 'number',
  dropdown: 'dropdown',
  multiSelect: 'multiSelect',
  date: 'date',
  signature: 'signature',
  table: 'table',
  chart: 'chart',
  inputGroup: 'inputGroup',
  uniqueId: 'uniqueId',
  file: 'file',
  task: 'task',
  list: 'list',
  user: 'user',
};
FieldTypes.all = Object.keys(FieldTypes);

/** Table column `type` strings */
export const FieldTableColumnTypes = {
  text: 'text',
  dropdown: 'dropdown',
  image: 'image',
};
FieldTableColumnTypes.all = Object.keys(FieldTableColumnTypes);

/** Field position / display metadata (subset used by tests) */
const displayTypes = {
  original: 'original',
  horizontal: 'horizontal',
  inputGroup: 'inputGroup',
  text: 'text',
  circle: 'circle',
  square: 'square',
  check: 'check',
  radio: 'radio',
};
displayTypes.all = Object.keys(displayTypes);

const conditions = { equal: 'equal' };
conditions.all = Object.keys(conditions);

const targetValueDisplayTypes = { original: 'original', custom: 'custom' };
targetValueDisplayTypes.all = Object.keys(targetValueDisplayTypes);

const displays = { inline: 'inline', none: 'none' };
displays.all = Object.keys(displays);

const textTransforms = { uppercase: 'uppercase', none: 'none' };
textTransforms.all = Object.keys(textTransforms);

const fontWeights = { bold: 'bold', normal: 'normal' };
fontWeights.all = Object.keys(fontWeights);

const fontStyles = { italic: 'italic', normal: 'normal' };
fontStyles.all = Object.keys(fontStyles);

const textDecorations = { underline: 'underline', none: 'none' };
textDecorations.all = Object.keys(textDecorations);

const textOverflows = { ellipsis: 'ellipsis' };
textOverflows.all = [textOverflows.ellipsis, ''];

const textAligns = { left: 'left', center: 'center', right: 'right' };
textAligns.all = Object.keys(textAligns);

export const FieldPositionTypes = {
  displayTypes,
  conditions,
  targetValueDisplayTypes,
  displays,
  textTransforms,
  fontWeights,
  fontStyles,
  textDecorations,
  textOverflows,
  textAligns,
};

/**
 * Field property keys accepted on field.update changelogs.
 * Mirrors root paths on DocumentFileFieldSchema in the main API.
 */
export const DOCUMENT_FILE_FIELD_UPDATE_PATHS = {
  _id: true,
  blockAutoPopulate: true,
  blockImport: true,
  deficiencies: true,
  deficienciesFailure: true,
  deleted: true,
  description: true,
  disabled: true,
  generateRandomUniqueIds: true,
  hidden: true,
  identifier: true,
  list: true,
  listColumn: true,
  logic: true,
  metadata: true,
  multi: true,
  options: true,
  requireDeficiencyDescription: true,
  requireDeficiencyPhoto: true,
  requireDeficiencyTitle: true,
  required: true,
  rowOrder: true,
  settings: true,
  signer: true,
  tableColumnOrder: true,
  tableColumns: true,
  tipDescription: true,
  tipTitle: true,
  tipVisible: true,
  title: true,
  type: true,
  value: true,
  xMax: true,
  xMin: true,
  xTitle: true,
  yMax: true,
  yMin: true,
  yTitle: true,
};
