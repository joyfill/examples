
const userAccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjY0YmVjYWY3NDU5NDQzYjU3MmQ4Y2M2OCJ9.TlGmYVqCkwBkXDxzssZwCos-tlR7Hi43wPPJ3XqxIgA";

export const retrieveTemplates = async () => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/templates?page=1&limit=25`, {
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

export const retrieveDocuments = async (template) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents?template=${template.identifier}&page=1&limit=25`, {
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

export const retrieveDocument = async (identifier) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}`, {
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
export const updateDocument = async (doc) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${doc.identifier}`, {
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

export const updateDocumentChangelogs = async (doc, changelogs) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${doc.identifier}/changelogs`, {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ changelogs })
  });

  const data = await response.json();
  return data;

};

export const createDocument = async (doc) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents`, {
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


export const createDocumentPDF = async (doc) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${doc.identifier}/exports/pdf`, {
    method: 'POST',
    mode:'cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields: [] })
  });
  

  const data = await response.json();
  return data.download_url;

}

export const uploadFileAsync = async (documentId, dataUri, userAccessToken) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${documentId}/files/datauri`, {
    method: 'POST', 
    mode: 'no-cors',
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ file: dataUri })
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


