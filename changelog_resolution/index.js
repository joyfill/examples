import { ChangelogTypes } from './src/constants.js';
import {
  sortChangelogs,
  handlePageCreateForJoySpecDocumentv1,
  handlePageDeleteForJoySpecDocumentv1,
  handleFieldCreateForJoySpecDocumentv1,
  handleFieldUpdateForJoySpecDocumentv1,
  handleFieldRowCreateForJoySpecDocumentv1,
  handleFieldRowMoveForJoySpecDocumentv1,
  handleFieldRowDeleteForJoySpecDocumentv1,
  handleFieldRowUpdateForJoySpecDocumentv1,
} from './src/changelogHelper.js';

/**
 * Apply changelogs to a JoyDoc / JoySpec payload (plain JSON-like objects; no Mongoose).
 *
 * @param {Object} joyDoc
 * @param {Array} changelogs
 * @returns {Object} New document (input is not mutated).
 */
export const applyChangelogsToJoyDoc = (joyDoc, changelogs) => {
  let next = structuredClone(joyDoc);
  const sortedChangelogs = sortChangelogs(changelogs);

  sortedChangelogs.forEach((changelog) => {
    switch (changelog.target) {
      case ChangelogTypes.pageCreate:
        next = handlePageCreateForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.pageDelete:
        next = handlePageDeleteForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.fieldCreate:
        next = handleFieldCreateForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.fieldUpdate:
        next = handleFieldUpdateForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.fieldRowCreate:
        next = handleFieldRowCreateForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.fieldRowUpdate:
        next = handleFieldRowUpdateForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.fieldRowMove:
        next = handleFieldRowMoveForJoySpecDocumentv1(next, changelog);
        break;
      case ChangelogTypes.fieldRowDelete:
        next = handleFieldRowDeleteForJoySpecDocumentv1(next, changelog);
        break;
      default:
        break;
    }
  });

  return next;
};
