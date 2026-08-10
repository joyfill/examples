var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var puppeteer = require('puppeteer');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register before express.static so GET /health is never handled by static file lookup.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * Build raw HTML string for JoyDoc PDF export.
 * Embeds the document JSON and loads Joyfill CDN; inline script runs JoyDocExporter and marks container ready.
 *
 * @param {Object} document - JoyDoc document from request payload
 * @returns {string} Full HTML document string
 */
function buildJoyDocExportHtml(document) {

  const jsonStr = JSON.stringify(document);
  const safeJson = jsonStr.replace(/<\/script>/gi, '\\u003c/script>');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://cdn.jsdelivr.net/npm/@joyfill/components@4.0.0-rc9/dist/joyfill.min.js"></script>
      </head>
      <body style="margin:0;padding:0;">
        <div id="joyfill-export-container"></div>
        <style>
        html {
          /* DO NOT DELETE! VERY IMPORTANT FOR PDF EXPORTS */
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        body {
          /* DO NOT DELETE! VERY IMPORTANT FOR PDF EXPORTS */
          margin: 0px;
        }
      </style>
        <script type="application/json" id="export-doc">${safeJson}</script>
        <script>
          (function() {

            var el = document.getElementById('export-doc');
            var doc = JSON.parse(el.textContent);
            var container = document.getElementById('joyfill-export-container');

            Joyfill.JoyDocExporter(container, {
              doc: doc,
              theme: { fontFamily: 'sans-serif' }
            });

            function markReady() {
              container.id = 'pdf-capture-ready';
              container.classList.add('pdf-capture-ready');
            }

            if (requestAnimationFrame) {
              requestAnimationFrame(function() { requestAnimationFrame(markReady); });
            } else {
              setTimeout(markReady, 100);
            }

          })();
        </script>
      </body>
    </html>
  `;
}

/**
 * PDF Creation Handler
 */
app.post('/pdf', async function(req, res, next) {

  /**
   * Document is a joydoc json object.
   * Timezone is a string in the format of "America/New_York".
   */
  const document = req.body.document;
  const timezone = req.body.timezone; //Optional but recommended to set the timezone of the document.

  let browser = null;

  try {

    /**
     * Step 1 Launch local chromium installed with puppeteer 
     */
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true,
      args: [
        '--disable-web-security', //DO NOT REMOVE! See ReadMe file for details

        //Font options from: https://docs.browserless.io/blog/2020/09/30/puppeteer-print.html
        '--font-render-hinting=none',
        '--force-color-profile=srgb'
      ]
    });

    /**
     * Step 1 (alternative) Connect to browserless chromium instance
     */
    //browser = await puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=<REPLACE_BROWSERLESS_KEY>` });


    /**
     * Step 2 Setup web page. 
     *  * 816x1056 represents a standard Letter format. You will also see this in the pdf options below.
     */
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");
    await page.setViewport({ width: 816, height: 1056})

    /*
    * Example of how to emulate a timezone:
    * if (payload.timezone){
    *   await page.emulateTimezone(payload.timezone);
    * }
    */

    /**
     * Step 3 Build the HTML string with the Joyfill PDF SDK.
     */
    const html = buildJoyDocExportHtml(document);


    /**
     * Step 4 set the content of the web page to the HTML string.
     */
    await page.setContent(html, {
      waitUntil: 'networkidle0' //Good for external resources like images, fonts, etc.
    });

    /**
     * Step 5 Wait for the Joyfill SDK to mark the container as ready when the PDF is ready to be captured.
     */
    await page.waitForSelector('div#pdf-capture-ready.pdf-capture-ready');

    /**
     * Step 6 Capture the PDF.
     */
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      scale: 1,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      margin: { top: 0, bottom: 0, right: 0, left: 0 },
      headerTemplate: "",
      footerTemplate: "",
      width: 816,
      height: 1056
    });

    /**
     * Step 7 Save the PDF to the file system.
     */
    fs.writeFileSync(`${new Date().getTime()}-example.pdf`, pdfBuffer)

    console.log('Succesfully created pdf file! See example.pdf');

    res.status(200);
    res.send('Success');

  } catch (e) {

    console.error('Error:', e);
    throw e;

  } finally {

    if (browser) await browser.close();

  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
