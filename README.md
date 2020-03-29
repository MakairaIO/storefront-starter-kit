# Makaira Storefront

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v13.9.0


### Installation

* Clone this repository
* Install dependencies: `npm ci`
* Configure your individual `.env` file in the root directory (see `.env.example`)


### Development

* Start development server: `npm run dev`
* Visit Pattern Library at [http://localhost:500/pali](http://localhost:5000/pali)
* Visit Storefront at [http://localhost:5000/](http://localhost:5000/)


### Running Tests

* Run tests in watch-mode: `npm run test`


### Building


### Deploying



## FAQ

### IE11 Compatability

By default, this application is not supporting IE11. If you need to support IE11, there are a couple of APIs and features that you will need to polyfill or refactor:

**CSS Custom Properties**

The application makes heavy use of CSS Custom Properties. In order to add a fallback for IE11, you will need to perform the following steps:

- `npm install -D poststylus postcss-css-variables`
- Modify file `next.config.js` to look like the following:

```javascript
require('dotenv').config()

const withStylus = require('@zeit/next-stylus')
const poststylus = require('poststylus')
const cssvariables = require('postcss-css-variables')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const stylusLoaderOptions = {
  use: [
    poststylus([
      cssvariables({
        preserve: true, // set this to false if you don't need custom properties at runtime
      }),
    ]),
  ],
}

module.exports = withStylus({
  stylusLoaderOptions,
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
})
```
