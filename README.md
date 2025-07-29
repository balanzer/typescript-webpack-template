# Web Application Data Layer


* To install TypeScript globally use `npm install -g typescript` (not reqd)

* `npx tsc --init` - Configuring TypeScript project (not reqd)

* To check Node.js version: `node -v` or `node --version`

* To check npm version:: `npm -v` or `npm --version`

* To check Typescript version: `npx tsc -v` or `npx tsc --version`


## Data Layer App Setup Instructions

Open Terminal and execute installation command

### Clean install project

`npm ci` or  `npm install`


## Webpack Dependencies

### Installing Dependencies (if reqd)

`npm install webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin --save-dev`

`webpack:` The core module bundler.

`webpack-cli:` The command-line tool to run Webpack.

`webpack-dev-server:` A development server that provides live reloading.

`typescript:` The TypeScript compiler.

`ts-loader:` A Webpack loader that transpiles TypeScript code into JavaScript.

`html-webpack-plugin:` A plugin that simplifies the creation of HTML files to serve your bundles



## Running Project

* build - `npm run build`

* start -  `npm start` - open browser url - `http://localhost:9000/`

* unit tests & code coverage  - `npm run test` - check terminal for test results

* view test coverage results at `/coverage/lcov-report/index.html`

* ESLint `npm run lint` or `npx eslint scripts/src/greetings.ts` (to run single file)


### IDE Setup - Visual studio extensions

* Prettier - Code formatter 
    * enable format on save
    * disable single quote (consistency - lets use double quotes) - html, remove single quote setting for Prettier


* ESLint

* Jest - vscode-jest (to run unit tests)