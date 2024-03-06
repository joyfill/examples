# Overview

This example project requires you to have for ngrok and browserless:
* ngrok
* browerless

# Setup

1. Start ngrok to point at http port 3000 `ngrok http 3000` 
2. Replace browserless API Key in `app.js` file
3. Add ngrok url from step 1 to the `page.goto` method call.
4. Run `npm start`

# Load Data Server Side

```

<!DOCTYPE html>
<html>
  <head>
    <title>Joyfill PDFs</title>
    <base href=".">
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/@joyfill/components@3.6.1-beta.20/dist/joyfill.min.js"></script>
    <style>
      body {
        padding: 0px;
        margin: 0px;
      }
    </style>
  </head>
  <body>
    <div id="joyfill"></div>
    <script>

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
  </body>
</html>
```

# Upload to S3

```

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
