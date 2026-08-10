## Getting Started

Head over to [Joyfill developer docs](https://docs.joyfill.io/docs/quick-start) to learn more, find guided tutorials and much more.

## Setup

**Requirements**

* Node v20+

**Steps:**

* Replace `<REPLACE WITH YOUR USER ACCESS TOKEN>` in file `joyfill.service.ts` with the user access token from the Joyfill Quick Start guide.
* Replace `<REPLACE WITH YOUR TEMPLATE IDENTIFIER>` in file `app.component.ts` with the template identifier from the Joyfill Quick Start guide.
* Run `npm install`
* Run `ng serve`

## General

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Typescript

We have added the properties below to the "compilerOptions" in the tsconfig.json file in order to support the Joyfill JS SDK

```
"allowJs": true,
"noImplicitAny": false
```

Add a key in your tsconfig.json file to allow the use of JavaScript bundles in TypeScript. Here are the two keys you need to add:

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
