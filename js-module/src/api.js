const userAccessToken = '<REPLACE_USER_ACCESS_TOKEN>';
const apiBaseUrl = 'https://api-joy.joyfill.io';

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

