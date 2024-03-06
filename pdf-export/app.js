var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var puppeteer = require('puppeteer');
var logger = require('morgan');
var router = express.Router();
var JoyfillAPI = require('./joyfillAPI');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Step 1: Setup Web Views
 */
app.get('/joyfill_pdf', function(req, res, next) {
  res.status(200);
  res.sendFile(__dirname + '/views/joyfill.html');
});

app.get('/', function(req, res, next) {
  res.status(200);
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * Step 2: Setup PDF File Creation Handler
 */
app.get('/pdf', async function(req, res, next) {

  const BROWSERLESS_API_KEY = '<REPLACE_BROWSERLESS_KEY>';
  const NGROK_URL = '<REPLACE_NGROK_URL>';

  let browser = null;

  try {

    /**
     * Step 2.1 Connect to browserless chromium instance
     */
    browser = await puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_API_KEY}` });

    /**
     * Step 2.1 Setup web page. 
     *  * 816x1056 represents a standard Letter format
     */
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");
    await page.setViewport({ width: 816, height: 1056})

    /**
     *
     * Uncomment block of code to use Puppeteer Load Data via Backend Option. See README to learn more
     *
    const template = await JoyfillAPI.retrieveTemplate();
    await page.evaluateOnNewDocument((data) => {
      window.template = data;
    }, template)
    */

    await page.goto(`${NGROK_URL}/joyfill_pdf`, {
      waitUntil: 'networkidle0'
    })

    const pdfOptions = {
      format: 'Letter',
      scale: 1,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      margin: { top: 0, bottom: 0, right: 0, left: 0 },
      headerTemplate: "",
      footerTemplate: "",
      width: 816,
      height: 1056
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    fs.writeFileSync('example.pdf', pdfBuffer)

    console.log('Succesfully created pdf file! See example.pdf');

    res.status(200);
    res.send('Success');

  } catch (e) {

    console.error('Error:', e);
    throw e;

  } finally {

    console.log('>>>>>>>>>>> closing browser');
    if (browser) await browser.close();

  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile(__dirname + '/views/error.html');
});

module.exports = app;
