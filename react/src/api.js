
const userAccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjY0YmVjYWY3NDU5NDQzYjU3MmQ4Y2M2OCJ9.TlGmYVqCkwBkXDxzssZwCos-tlR7Hi43wPPJ3XqxIgA'//"<REPLACE_USER_ACCESS_TOKEN>";
const apiBaseUrl = "https://api-joy.joyfill.io";

export const createTemplate = async (doc) => {

  const response = await fetch(`${apiBaseUrl}/v1/templates`, {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doc)
  });

  const data = await response.json();
  return data;

};

export const retrieveTemplate = async (identifier) => {

  const response = await fetch(`${apiBaseUrl}/v1/templates/${identifier}`, {
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

export const updateTemplate = async (identifier, template) => {

  const response = await fetch(`${apiBaseUrl}/v1/templates/${identifier}`, {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(template)
  });

  const data = await response.json();
  return data;

};

export const listTemplates = async () => {

  const response = await fetch(`${apiBaseUrl}/v1/templates?page=1&limit=25`, {
    method: 'GET',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
  });

  const data = await response.json();

  return data;

};

export const exportDocument = async (identifier, userAccessToken) => {

  const response = await fetch(`${apiBaseUrl}/v1/documents/exports/pdf`, {
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

export const listDocumentsForTemplate = async (templateIdentifier) => {

  const response = await fetch(`${apiBaseUrl}/v1/documents?page=1&limit=25&stage=all&template=${templateIdentifier}`, {
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

export const retrieveDocument = async (documentIdentifier) => {

  const response = await fetch(`${apiBaseUrl}/v1/documents/${documentIdentifier}`, {
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

export const saveDocument = async (doc) => {

  const response = await fetch(`${apiBaseUrl}/v1/documents/${doc.identifier}`, {
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

export const createDocument = async (doc) => {

  const response = await fetch(`${apiBaseUrl}/v1/documents`, {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doc)
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

  const response = await fetch(`${apiBaseUrl}/v1/documents/${documentId}/files/datauri`, {
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

    const response = await fetch(`${apiBaseUrl}/v1/utilities/pdf/to/png/datauri`, {
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
