import { Portal } from "@joyfill/sdk-js/dist/joyfill.esm.full.js";

// you will want to use our list users endpoint to get
// users and their user access tokens
const userAccessToken = 'sandbox_access_token_1234abcdeffoobar';

// call this anytime you want to insert the Joyfill Portal
// you can pass any values to the JoyDoc from here just
// like mode | userAccessToken
Portal.load({
  userAccessToken: userAccessToken,
  mode: 'edit', // fill | edit | readonly (only applies if feature is "document")
  mountOn: '#joyfill-portal',
  documentIdentifier: 'doc_642afe732827750640',
  submitText: 'Save Changes',
  onUploaded: ({ type, document, fileUpload }) => {
    console.log('onUploaded: ', type)
  },
  onSubmit: ({ type, doc }) => {
    console.log('onSubmit: ', doc)
  },
  onChange: ({ type, params, changes, doc }) => {
    console.log('onChange: ', params, changes, doc)
  },
  onError: ({ error }) => {
    console.log('onError: ', error)
  }
});
