// you will want to use our list users endpoint to get
// users and their user access tokens
// const userAccessToken = 'sandbox_access_token_1234abcdeffoobar';

// onLoad of your page immediately load/insert Joyfill portal
//  * this can be added anywhere not just on page load *
function loadJoyfill() {
  const Joyfill = window.joyfill;
  console.log('Joyfill:', Joyfill)
  console.log('window joyfill:', window.joyfill)

  Joyfill.Portal.load({
    userAccessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjY0NDAzYTA3NWFjYmJhZmQ2NmNmZWU1NiJ9.KBEC156vqevervU5QOLgbGCqKN1ansJpDREt_J56_uM',
    mode: 'edit', // fill | edit | readonly (only applies if feature is "document")
    mountOn: '#joyfill-portal',
    documentIdentifier: 'doc_644039b2c360b53580260294',
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
}
