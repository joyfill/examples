
const userAccessToken = "<REPLACE_WITH_USER_ACCESS_TOKEN>";

export const retrieveTemplate = async (identifier) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/templates/${identifier}`, {
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

export const updateTemplate = async (identifier, template) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/templates/${identifier}`, {
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

export const retrieveDocuments = async (templateIdentifier) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents?template=${templateIdentifier}&page=1&limit=25`, {
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

export const updateDocument = async (identifier, doc) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}`, {
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

export const updateDocumentChangelogs = async (identifier, changelogs) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}/changelogs`, {
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


export const createDocumentPDF = async (identifier) => {

  const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}/exports/pdf`, {
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


