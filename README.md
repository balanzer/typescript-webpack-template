# typescript-webpack-template

Setting Up a New Webpack Project with TypeScript

## Clean install project

`npm ci`

## Install project

`npm install`

## Webpack

## Installing Dependencies

`npm install webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin --save-dev`

webpack: The core module bundler.

webpack-cli: The command-line tool to run Webpack.

webpack-dev-server: A development server that provides live reloading.

typescript: The TypeScript compiler.

ts-loader: A Webpack loader that transpiles TypeScript code into JavaScript.

html-webpack-plugin: A plugin that simplifies the creation of HTML files to serve your bundles

## Configuring TypeScript

`npx tsc --init`

## Running Project

`npm start` - starts browser with (http://localhost:9000/)

## Build

`npm run build`

## ESLint

`npm run lint`

or 

`npx eslint scripts/src/greetings.ts`