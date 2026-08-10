
const userAccessToken = '<REPLACE_USER_ACCESS_TOKEN>';
const apiBaseUrl = 'https://api-joy.joyfill.io';

export const createTemplate = async (doc) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/templates`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }

};

export const retrieveTemplate = async (identifier) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/templates/${identifier}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }

}

export const updateTemplate = async (identifier, template) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/templates/${identifier}`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(template)
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }

};

export const listTemplates = async () => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/templates?page=1&limit=25`, {
      method: 'GET',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }


};

export const listDocumentsForTemplate = async (templateIdentifier) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/documents?page=1&limit=25&stage=all&template=${templateIdentifier}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.status !== 200) return null;

    return await response.json();

  } catch (e) {
    console.log(e);
  }


}

export const createDocumentPDF = async (identifier) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/documents/${identifier}/exports/pdf`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (response.status !== 200) return null;

    return await response.json();

  } catch (e) {
    console.log(e);
  }


}

export const retrieveDocument = async (identifier) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/documents/${identifier}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.status !== 200) return null;

    return await response.json();

  } catch (e) {
    console.log(e);
  }

}

export const updateDocument = async (identifier, doc) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/documents/${identifier}`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    });

    if (response.status !== 200) return null;

    return await response.json();

  } catch (e) {
    console.log(e);
  }

};

export const createDocument = async (doc) => {

  try {

    const response = await fetch(`${apiBaseUrl}/v1/documents`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }


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

  try {

    const response = await fetch(`${apiBaseUrl}/v1/documents/${documentId}/files/datauri`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ file: dataUri }) // body data type must match "Content-Type" header
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (error) {

    throw error;

  }

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

    if (response.status !== 200) return null;

    return await response.json();

  } catch (error) {

    throw error;

  }

};

