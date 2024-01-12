const userAccessToken = '<REPLACE_USER_ACCESS_TOKEN>';
const apiBaseUrl = 'https://api-joy.joyfill.io';

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
