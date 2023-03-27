import { Portal } from "../../../dist/joyfill.esm.full.js";

// you will want to use our list users endpoint to get
// users and their user access tokens
const userAccessToken = '<replace_me>';

// call this anytime you want to insert the Joyfill Portal
// you can pass any values to the JoyDoc from here just
// like mode | userAccessToken
Portal.load({
  userAccessToken: userAccessToken,
  mode: 'edit', // fill | edit | readonly
  mountOn: '#joyfill-portal',
  submitText: 'Save Changes',
  onUploaded: ({ type, document, fileUpload }) => {
    console.log('onUploaded: ', type)
  },
  onSubmit: ({ type, doc }) => {
    console.log('onSubmit: ', doc)
  },
  onChange: ({ type, params, changes, doc }) => {
    console.log('onChange: ', params, changes, doc)
  }
});
