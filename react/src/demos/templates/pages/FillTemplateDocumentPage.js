import React, { useState, useEffect } from 'react';
import { JoyDoc } from '@joyfill/components';
import { useParams } from "react-router-dom";

import Loading from "../../../Loading";

import { 
  updateDocument, 
  retrieveDocument,
  createDocumentPDF
} from '../../../api.js';

function FillTemplateDocumentPage() {

  const { templateIdentifier, documentIdentifier } = useParams();

  const [ doc, setDoc ] = useState(null);
  const [ mode, setMode ] = useState('edit');
  const [ pdfLink, setPDFLink ] = useState(null);

  useEffect(() => {
    const handleRetrieveDocument = async () => {
      const response = await retrieveDocument(documentIdentifier);
      setDoc(response);
    }
    handleRetrieveDocument();
  }, []);

  const handleUpdateDocument = async () => {
    const response = await updateDocument(documentIdentifier, doc);
    setDoc(response);
  }

  const handleCreatePDF = async () => {
    const response = await createDocumentPDF(documentIdentifier);
    setPDFLink(response.preview_url);
  }

  return (
    <div className="App">
      <div className="header">
        <button className="action" onClick={handleCreatePDF}>
          Generate PDF 
        </button>
        {!pdfLink ? null : ( 
          <a href={pdfLink} target="_blank" className="action">Preview PDF</a>
        )}
        <button className="action" onClick={handleUpdateDocument}>
          Save Changes
        </button>
      </div>

      <div className='form'>
        <JoyDoc
          mode="fill"
          doc={doc}
          onChange={(changelogs, data) => {

            /**
             * Changelogs represent the individual change that was made
             * Data represents the entire data structure with all new changes applied.
             */
            console.log('>>>>>>>: ', changelogs, data);
            setDoc(data);

          }}
          onUploadAsync={async (params, fileUploads) => {

            /**
             * See how to handle file uploads here: 
             * https://docs.joyfill.io/docs/react-image-and-pdf-uploads
             */
            console.log('>>>>>>>>>>>: ', fileUploads);
          }}
        />
      </div>
    </div>
  );
}

export default FillTemplateDocumentPage;
