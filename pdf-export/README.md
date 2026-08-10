# Generate PDFs with Joyfill

This is a basic Node.js and Express project that demonstrates how to generate a PDF from a web page using the Joyfill JS SDK and Puppeteer.

In the app.js file, you'll see that we construct the required HTML and styles inside the buildJoyDocHtml helper method. The styles applied to the html and body tags are important and should be included to ensure accurate rendering.

Within the generated HTML, we also inject the JSON data so it can be accessed when the SDK loads via the CDN. That HTML is then passed into Puppeteer for rendering. Once Puppeteer finishes rendering the page, we use its built-in PDF generation capability to create the PDF and store it locally. In a real production environment, you would likely store the generated PDF in a solution such as Amazon S3.

There are many different ways to approach PDF generation, but this project is intended to demonstrate a simple and practical implementation. While lightweight, this approach is fully viable for production use and is the same general strategy used by other Joyfill partners who manage PDF generation within their own infrastructure.

# Requirements

* Node v18+

# Optional

* Running chromium: You can either use the local chromium installed via puppeteer or connect to a remote chromium instance with something like [Browserless](https://www.browserless.io/)

# Getting Started

* **Step 1** Run `npm install` 
* **Step 2** Run `npm start`

# Generating a PDF

All you need to do is send a POST http request to the `/pdf` route with your JSON using the `document` body property. Once the PDF is generated it will be stored in the root directory of this project.

Bonus: We've included a test.json file for a valid joydoc json payload for testing. Feel free to use your own.

**Example CURL request using our test.json payload**
```
curl -X POST "http://localhost:3000/pdf" \
  -H "Content-Type: application/json" \
  --data-binary @request.json
```