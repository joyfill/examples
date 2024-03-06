Joyfill PDF SDK can be used generate PDF files that can be stored directly in your own system, S3, or some other file storage from a Joyfill Form.

The Joyfill Export SDK is rendered in a web page and used with a headless browser like Puppeteer, Selenium, etc. to convert the web page into a PDF file.

This example project walks you throw how to use Node.js, Puppeteer, and Joyfill PDF SDK to generate a local PDF file from a Joyfill Form.

# Requirements

* Node v18+

# Prerequisites

* Complete [Setup Guide](https://docs.joyfill.io/docs/setup) 
* Review [Key Terminology](https://docs.joyfill.io/docs/key-terminology)
* Create [Ngrok Account](https://ngrok.com/) and [Install Ngrok](https://ngrok.com/docs/getting-started/)
* Create [Browserless Account](https://www.browserless.io/)

# Getting Started

* **Step 1** Start ngrok to point at http port 3000. Run `ngrok http 3000` in your terminal.
* **Step 2** Replace BROWSERLESS_API_KEY in `app.js` file with your own browserless API key.
* **Step 3** Replace NGROK_URL in `app.js` ngrok url from Step 1. 
* **Step 4** Replace TEMPLATE_IDENTIFIER in `views/joyfill.html` file with your own Joyfill template identifier from the prerequisite setup guide.
* **Step 5** Replace USER_ACCESS_TOKEN in `views/joyfill.html` file with your own Joyfill user access token from the prerequisite setup guide. 
* **Step 6** Run `npm install` 
* **Step 7** Run `npm start`
* **Step 8** Open your browser to `localhost:3000`

# Project Breakdown

Step by step breakdown on how a PDF file is created using the Joyfill PDF SDK in this project:

## First: Add Joyfill PDF SDK to a web page

 In this example we use VanillaJS and CDN approach with the Joyfill PDF SDK in our `views/joyfill.html` web page to render the form. In your own project you can use react, angular, etc. to render the Joyfill PDF SDK to a web page. The most important thing is to simply have the Joyfill PDF SDK rendering to a web page.

**Important Note:** Ensure that no margin, padding, or other external spacing styles are targeting the body or any other parent elements that contains the Joyfill Export SDK. The Joyfill Export SDK is sized to support standard PDF Letter dimensions. Any additional spacing could impact the sizing and cause fields to get cut off. 

## Second: Use a headless browser to generate the PDF from your web page

In this step we have used Browserless and Puppeteer in our `app.js > "/pdf"` route to load our web page and convert it to a PDF. Once puppeteer has captured the web page with our form we are simply saving the file locally. In your own system you can upload that file to your internal file store, S3, or anywhere else. See our S3 example below.

# Bonus

## Load Data Server Side Example

If you want to load your Joyfill form data server side instead of client side follow the steps below to achieve that with Puppeteer (configuration will vary between headless browsers).

* **Step 1:** Add the following code snippet below in the `app.js > "/pdf"` route handler right before the `await page.goto` method.

```
  const template = await JoyfillAPI.retrieveTemplate();
  await page.evaluateOnNewDocument((data) => {
    window.template = data;
  }, template)

```
* **Step 2:** Update the TEMPLATE_IDENTIFIER and USER_ACCESS_TOKEN in the `joyfillAPI.js` file.
* **Step 3:** Update script block in `views/joyfill.html` file to the script block below.
```
<script>

  /**
   * window.template comes from the puppeteer.page.evaluateOnNewDocument method you added in step 1.
   */
  const initJoyfill = () => {

    if (!window.template) return alert('Invalid Template Data');

    Joyfill.JoyDocExporter(
      document.getElementById('joyfill'),
      {
        doc: window.template,
      }
    );

  }

  initJoyfill();

</script>
```

## Upload S3 and Generate Preview and Download Links Example

```

  //Puppeteer PDF 
  const pdfBuffer = await page.pdf(pdfOptions);

  const s3 = new S3({ region: 'us-east-1' });

  const s3Key = `/${new Date().getTime()}.pdf`;

  const s3UploadParams = {
    Bucket: 'pdfs',
    Body: pdfBuffer,
    ContentType: 'application/pdf',
    ACL: 'private',
    Key: s3Key,
    ServerSideEncryption: 'AES256',
    Expires: 60 * 60 * 24 * 30 //30 days
  };

  const result = await s3.upload(s3UploadParams).promise()

  const s3GetSignedParams = {
    Bucket: 'pdfs',
    Key: s3Key,
    Expires: 60 * 60 * 24 * 30, //30 days
    ResponseContentType: 'application/pdf'
  };

  const downloadS3Params = Object.assign({}, s3GetSignedParams, {
    ResponseContentDisposition: `attachment; filename=${s3Key}`,
  });

  const previewS3Params = Object.assign({}, s3GetSignedParams, {
    ResponseContentDisposition: `inline; filename=${s3Key}`,
  });

  const s3DownloadUrlResponse = await s3.getSignedUrlPromise('getObject', downloadS3Params);
  const s3PreviewUrlResponse = await s3.getSignedUrlPromise('getObject', previewS3Params);

  return { download_url: s3DownloadUrlResponse, preview_url: s3PreviewUrlResponse };

```
