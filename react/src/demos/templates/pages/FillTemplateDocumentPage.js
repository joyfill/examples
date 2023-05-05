import React, { useState, useEffect } from 'react';
import { JoyDoc } from '@joyfill/components';
import { useParams } from "react-router-dom";

import Loading from "../../../Loading";

import { saveDocument, retrieveDocument } from '../../../api.js';

function FillTemplateDocumentPage() {

  const { templateIdentifier, documentIdentifier } = useParams();

  const [ doc, setDoc ] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    retrieveTemplateDocument();
  }, []);

  const retrieveTemplateDocument = async () => {

    setLoading('Loading...');

    const response = await retrieveDocument(documentIdentifier);
    setDoc(response);

    setLoading(null);
  }

  const handleSaveDocument = async (doc) => {
    setLoading('Saving changes...');
    const response = await saveDocument(doc);
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
          <button className="action" onClick={() => handleSaveDocument(doc)}>
            Save Changes
          </button>
        </column>
      </div>
      <Loading text={loading} />
      <div className='form'>
        <JoyDoc
          mode="fill"
          doc={doc}
          onChange={(params, changes, doc) => {
            setDoc(doc);
          }}
        />
      </div>
    </div>
  );
}

export default FillTemplateDocumentPage;
