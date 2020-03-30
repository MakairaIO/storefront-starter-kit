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


### Initial Deployment

#### With Dokku

For all steps, replace `<SERVER>`,`<APP_NAME>` and other placeholders (`< ... > `) with your credentials.

1. Create a new app:

`ssh dokku@<SERVER>.makaira.cloud apps:create <APP_NAME> && git push dokku@<SERVER>.makaira.cloud:<APP_NAME> <LOCAL_BRANCH>:master && ssh dokku@<SERVER>.makaira.cloud proxy:ports-clear <APP_NAME> && ssh dokku@<SERVER>.makaira.cloud proxy:ports-add <APP_NAME> http:80:5000 && ssh dokku@<SERVER>.makaira.cloud letsencrypt <APP_NAME> && ssh dokku@<SERVER>.makaira.cloud secure:set <APP_NAME> makaira <APP_NAME> && ssh dokku@<SERVER>.makaira.cloud secure:enable <APP_NAME>`

2. Set your environment configuration:

`ssh dokku@<SERVER>.makaira.cloud config:set <APP_NAME> MAKAIRA_API_URL=https://<APP_NAME>.makaira.io MAKAIRA_API_INSTANCE=<INSTANCE> MAKAIRA_ASSET_URL=https://<APP_NAME>.s3.eu-central-1.amazonaws.com SHOP_ID=1 PRODUCTS_PER_PAGE=50 SHOP_DOMAIN=https://<APP_NAME>.<SERVER>.makaira.cloud`

3. Generate a new build:

`ssh dokku@<SERVER>.makaira.cloud ps:rebuild <APP_NAME>`





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
