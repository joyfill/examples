import { Portal } from "@joyfill/sdk-js/dist/joyfill.esm.full.js";

// you will want to use our list users endpoint to get
// users and their user access tokens
const userAccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjY0MjIyMjU0NjE2NzcyZmFmYzdhNzc2MiJ9.vjw0KYOQ6hlo98ar7BDz-6ADYZndV4hwFRF4XAQtz58';

// call this anytime you want to insert the Joyfill Portal
// you can pass any values to the JoyDoc from here just
// like mode | userAccessToken
Portal.load({
  userAccessToken: userAccessToken,
  mode: 'edit', // fill | edit | readonly
  mountOn: '#joyfill-portal',
  document: 'doc_642221ca8553d877267f1b20',
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
