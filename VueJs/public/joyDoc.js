import api from './api.js';
import Ids from './ids.js';

//Declared Variables ..
let doc = null;
let mode = 'edit';
let pdfLink = null;


//JoyFill Retrieve document function ....

const retrieveJofillDocument = async () => {

  //JoyfillRetrieve api Function ...
  const response = await api.joyfillRetrieve(Ids.documentId, Ids.userAccessToken);
  doc = response;

  //JoyFill component ..
  const params = {
    mode: mode,
    doc: doc,
    onChange: (params, changes, doc) => {
      console.log(doc)
      doc = doc
    },
  }
  const joyFill = Joyfill(params)
  document.getElementById('target').appendChild(joyFill);
}


// Joy fill element Load ..
Window.onload = retrieveJofillDocument()
