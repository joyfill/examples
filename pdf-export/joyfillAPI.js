
const TEMPLATE_IDENTIFIER = '<REPLACE_YOUR_TEMPLATE_IDENTIFIER>';
const USER_ACCESS_TOKEN = '<REPLACE_USER_ACCESS_TOKEN>';

const retrieveTemplate = async () => {

  try {

    const response = await fetch(`https://api-joy.joyfill.io/v1/templates/${TEMPLATE_IDENTIFIER}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${USER_ACCESS_TOKEN}`,
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

module.exports = {
  retrieveTemplate
}
