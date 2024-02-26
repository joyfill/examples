
const userAccessToken = "<REPLACE_WITH_USER_ACCESS_TOKEN>";

export const retrieveTemplate = async (identifier) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/templates/${identifier}`, {
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


export const retrieveTemplates = async () => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/templates?page=1&limit=25`, {
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

export const updateTemplate = async (identifier, template) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/templates/${identifier}`, {
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

export const retrieveDocuments = async (templateIdentifier) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents?template=${templateIdentifier}&page=1&limit=25`, {
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

export const retrieveDocument = async (identifier) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}`, {
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

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}`, {
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


export const updateDocumentChangelogs = async (identifier, changelogs) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}/changelogs`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ changelogs })
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }

};

export const createDocument = async (doc) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents`, {
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



export const createDocumentPDF = async (identifier) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${identifier}/exports/pdf`, {
      method: 'POST',
      mode:'cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: [] })
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data.download_url;

  } catch (e) {
    console.log(e);
  }


}

export const uploadFileAsync = async (documentId, dataUri, userAccessToken) => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/documents/${documentId}/files/datauri`, {
      method: 'POST', 
      mode: 'no-cors',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ file: dataUri })
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data;

  } catch (error) {

    throw error;

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


