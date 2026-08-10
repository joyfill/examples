# Changelog resolution

Self-contained JavaScript package that applies Joyfill-style changelogs to a **JoyDoc** / JoySpec document (plain JSON-like objects). It does **not** use Mongoose; the entry API takes a document in and returns an updated copy (the input is not mutated).

## Requirements

- **Node.js 18+** (uses native `structuredClone` and ES modules)

## Project layout

| Path | Purpose |
|------|---------|
| `index.js` | Public entry: `applyChangelogsToJoyDoc` applies sorted changelogs |
| `src/changelogHelper.js` | Handlers for page/field/row operations |
| `src/utils.js` | Page and table row ordering helpers |
| `src/constants.js` | Changelog targets, field/column types, position metadata, and allowed `field.update` keys |
| `example/run.mjs` | Small runnable demo |
| `test/changelogHelper.test.js`, `test/index.test.js` | Mocha/Chai tests |

Runtime code has **no npm dependencies**. Tests use **Mocha** and **Chai** as devDependencies only.

## Install

From this directory:

```bash
npm install
```

`npm install` is only required if you plan to run tests (it installs Mocha and Chai). The demo script uses no packages.

## Run the example

```bash
npm start
```

This runs `example/run.mjs`, which loads a minimal JoySpec, applies sample changelogs, and prints before/after details.

You can also run the example directly:

```bash
node example/run.mjs
```

## Test

After `npm install`:

```bash
npm test
```

This runs Mocha on `test/**/*.test.js` (changelog helpers and `applyChangelogsToJoyDoc`).

## Use as a library

```javascript
import { applyChangelogsToJoyDoc } from './index.js';
import { ChangelogTypes } from './src/constants.js';

const updated = applyChangelogsToJoyDoc(joyDoc, changelogs);
```

`joyDoc` should match the shape your app uses (e.g. `files`, `fields` as arrays). Changelog payloads should use the same `target` values as `ChangelogTypes` and the same `change` / `fileId` / `fieldId` shapes as production.

## Sharing / zipping

Zip the entire `changelog_resolution` folder. Recipients should run `npm install && npm test` to verify, and `npm start` to see the demo. Include `package-lock.json` if you want reproducible dev dependency installs.
