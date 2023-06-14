// onLoad of your page immediately load/insert Joyfill portal
//  * this can be added anywhere not just on page load *
window.onload = function() {
  const Joyfill = window.joyfill;

  Joyfill.Portal.load({
    userAccessToken: '',
    mountOn: '#joyfill-portal',
    mode: 'edit',
    onUploaded: async ({ type, document, fileUploads }) => {
      console.log('onUploaded: ', type)
    },
    onSubmit: ({ type, doc }) => {
      console.log('onSubmit: ', doc)
    },
    onChange: ({ type, params, changes, doc }) => {
      console.log('onChange: ', params, changes, doc)
    }
  });
}
