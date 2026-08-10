import React, { useState, useEffect } from 'react';

import { JoyDoc } from '@joyfill/components';

import {
  retrieveTemplate,
  updateTemplate
} from '../../api.js';

const identifier = '<REPLACE_TEMPLATE_IDENTIFIER>';

function App() {

  const [ template, setTemplate ] = useState(null);
  const [ mode, setMode ] = useState('edit');

  useEffect(() => {
    const handleRetrieveTemplate = async () => {
      const response = await retrieveTemplate(identifier);
      if (response) setTemplate(response);
    }
    handleRetrieveTemplate();
  }, []);

  const handleUpdateTemplate = async () => {
    const response = await updateTemplate(identifier, template);
    if (response) setTemplate(response);
  }

  return (
    <div className="App">
      <div className="header">
        <button className="action" onClick={() => setMode(mode === 'edit' ? 'fill' : 'edit')}>
          Toggle Mode
        </button>
        <button className="action" onClick={handleUpdateTemplate}>
          Save Changes
        </button>
      </div>
      <div className='form'>
        <JoyDoc
          mode={mode}
          doc={template}
          onChange={(changelogs, data) => {

            /**
             * Changelogs represent the individual change that was made
             * Data represents the entire data structure with all new changes applied.
             */
            console.log('>>>>>>>: ', changelogs, data);
            setTemplate(data);

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

export default App;
