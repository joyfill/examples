// onLoad of your page immediately load/insert Joyfill portal
//  * this can be added anywhere not just on page load *
window.onload = function() {
  const Joyfill = window.joyfill;

  Joyfill.Portal.load({
    userAccessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjYzZTRlZTZmZWU4OWM4ZGU4NDYwOWVhOCIsImV4cGlyZXNPbiI6MTY4MzY5MTE5OTk5OX0.g_NFaYIeh-C238RxIGG1FiFWn9TNJnz1n29VA3tezSk',
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
