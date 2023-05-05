import React, { useState, useEffect } from 'react';
import Loading from "../../Loading";

// 1. import the JoyDoc component
import { JoyDoc } from '@joyfill/components';

import {
  saveDocument,
  exportDocument,
  retrieveDocument,
} from '../../api.js';

// 2, replace here with steps from our Getting Started -> Setup guide
const documentId = '<replace_me>';

function App() {

  const [ doc, setDoc ] = useState(null);
  const [ mode, setMode ] = useState('edit');
  const [pdfLink, setPdfLink] = useState(null);
  const [loading, setLoading] = useState(null);

  // retrieve the document from our api (you can also pass an initial documentId into JoyDoc)
  useEffect(() => {
    retrieveJofillDocument();
  }, []);

  const retrieveJofillDocument = async () => {
    setLoading('retrieving document...');
    const response = await retrieveDocument(documentId);
    setDoc(response);
    setLoading(null);
  }

  // save the form and generate a pdf as an example
  const saveForm = async (doc) => {
    setLoading('saving document & generating pdf...');
    await saveDocument(doc);
    const downloadableLink = await exportDocument(doc.identifier);
    setPdfLink(downloadableLink);
    setLoading(null);
  }

  return (
    <div className="App">
      <div className="row">
        <column>
          <a
            className="App-link"
            href="https://docs.joyfill.io/"
            target="_blank"
          >
            Checkout Joyfill Docs for More
          </a>
        </column>

        <column>
          <img src={'https://joyfill.io/wp-content/uploads/2022/03/Joyfill-logo-website-mobile.svg'} className="App-logo" alt="logo" />
        </column>

        <column>
          <button className="action" onClick={() => setMode(mode === 'edit' ? 'fill' : 'edit')}>
            Toggle Form Mode
          </button>
          <button className="action" onClick={() => saveForm(doc)}>
            Save Changes
          </button>
        </column>
      </div>

      <Loading text={loading} />
      {pdfLink && <a href={pdfLink} download>Download PDF</a>}

      <div className='form'>
        
        {/* 3. implement the JoyDoc in your react project */}
        <JoyDoc
          mode={mode}
          doc={doc}
          onChange={(params, changes, doc) => {
            console.log('onChange doc: ', doc);
            setDoc(doc);
          }}
          onUploadAsync={async ({ documentId }, fileUploads) => {
            // to see a full utilization of upload see api.js -> examples
            console.log('onUploadAsync: ', fileUploads);
          }}
        />
      </div>
    </div>
  );
}

export default App;
