
// 2. setup helpers
export const joyfillGenerate = async (identifier, userAccessToken) => {

  const response = await fetch("https://api-joy.joyfill.io/v1/documents/exports/pdf", {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ document: identifier })
  });
  

  const data = await response.json();
  return data.download_url;

}


export const joyfillRetrieve = async (documentIdentifier, userAccessToken) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${documentIdentifier}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
  });

  const data = await response.json();
  return data;
}


export const joyfillSave = async (doc, userAccessToken) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${doc.identifier}`, {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: "document",
      stage: "published",
      name: "ACME_WorkOrder",
      files: [doc.files[0]]
    })
  });

  const data = await response.json();
  return data;

};


export const getDataUriForFileUpload = async (fileUpload) => {

  return new Promise((ful, rej) => {

    const reader = new FileReader();

    reader.readAsDataURL(fileUpload);
    
    reader.onloadend = async () => {
      ful(reader.result);
    };

  });

};

export const uploadFileAsync = async (documentId, dataUri, userAccessToken) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${documentId}/files`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ file: dataUri }) // body data type must match "Content-Type" header
  });

  const data = await response.json();
  return data;

};

export const convertPDFPagesToBase64Async = async (dataUri, userAccessToken) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/utilities/pdf/to/png`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ file: dataUri }) // body data type must match "Content-Type" header
    });

    return await response.json();

  } catch (error) {

    throw error;

  }

};

// NON

/**
 * Examples
 *
 * 
 
 onUploadAsync={() => {
  const fileUpload = Array.isArray(fileUploads) ? fileUploads[0] : fileUploads;
  if (fileUpload.type === 'application/pdf') {

    const dataUri = await getDataUriForFileUpload(fileUpload);
    const base64DataUris = await convertPDFPagesToBase64Async(dataUri, userAccessToken);
    const fileUploadPromises = base64DataUris.map((uri) => uploadFileAsync(documentId, uri, userAccessToken));

    return Promise.all(fileUploadPromises);

  } else {

    const dataUri = await getDataUriForFileUpload(fileUpload, userAccessToken);
    return uploadFileAsync(documentId, dataUri, userAccessToken);

  } 
 }}

*/
