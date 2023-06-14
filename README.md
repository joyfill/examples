# Joyfill.io/developers Examples
Various example projects to help get you started quickly with the Joyfill forms platform. Joyfill sdk for embeddable UI and components can be tested here.

## Install
```
npm install @joyfill/sdk-js
```
or
```
yarn add @joyfill/sdk-js
```

## Getting Started
Head over to [Joyfill developer docs](https://docs.joyfill.io/docs).

### Retrieve API Key
From the Joyfill Manager we now need to create an API Key. Navigate to the API Keys menu option from the top nav menu of the Joyfill Manager.

### Embed your Portal
Use the following code to embed your Portal into your app. Also for more help run our /examples/js example project.

#### ESM
```ts
// /index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>

  <body>
    <div id="joyfill-portal"> <!--injects here--> </div>
    <script type="module" src="src/index.js"></script>
  </body>
</html>

// /index.js
import { Portal } from "@joyfill/sdk-js/dist/joyfill.esm.js";

/**
 * call whenever you'd like us to insert the portal
 * within the provided mountOn id
 */
Portal.load({
  documentIdentifier: 'doc_1234abscdefgt'
  userAccessToken: 'abcefg_doe123_33g',
  mountOn: '#joyfill-portal',
  mode: 'edit', // edit | fill | readonly
  onUploadAsync: ({ type, document, fileUploads }) => {
    /* handle file uploads here */
  },
  onSubmit: ({ type, doc }) => {
    /* handle final save of a from here */
  },
  onChange: ({ type, params, changes, doc }) => {
    /* handle actively made form changes here */
  }
});
```


#### Vanilla JS
Similar to ESM just can't use ES module imports.

```ts
// /index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/joyfill/dist/joyfill.js"></script>

  </head>

  <body>
    <div id="joyfill-portal"> <!--injects here--> </div>
    <script src="src/index.js"></script>
  </body>
</html>

// /index.js
window.onload = function() {
  var joyfill = window.joyfill;
  joyfill.Portal.load({
    mode: 'edit',
    documentIdentifier: 'doc_1234abscdefgt'
    userAccessToken: 'abcefg_doe123_33g',
    mountOn: '#joyfill-portal',
    ...<otherfields>
  });
}
```

### Next steps
Check out the [Joyfill developer docs](https://joyfill.readme.io/docs/quick-start) to see what's needed to get your Portal working in production, including:

1. [Getting Started React](https://docs.joyfill.io/docs/quick-start)
2. [Setting up Authentication](https://docs.joyfill.io/docs/authentication)
3. [Understanding the JoyDoc](https://docs.joyfill.io/docs/joydoc-usage)
4. [PDF Exports & Downloads](https://docs.joyfill.io/docs/platform-exports)
