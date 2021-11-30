# Makaira Storefront

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v16.13.0


### Installation

*Disclaimer: The following steps assume that you will keep the the upstream to the base repository for continous updates. If you don't want that, you can skip some of the steps and simply clone the repository and override the default remote `origin` with your own.*

* Clone this repository using the `--origin <name>` flag to set an remote name other than `origin` (for example `upstream`)
* Configure your own origin remote using `git remote add origin <your repository url>`
* Initial push of stable branch to your own remote: `git push origin stable`
* Configure default remote to be your own remote: `git branch --set-upstream-to origin/stable`
* Install dependencies: `npm ci`
* Configure your individual `.env` file in the root directory (see `.env.example`)


### Development

* Start development server: `npm run dev`
* Visit Pattern Library at [http://localhost:500/pali](http://localhost:5000/pali)
* Visit Storefront at [http://localhost:5000/](http://localhost:5000/)


### Creating new Patterns

The Storefront comes included with a CLI to help you generate all necessary files for new patterns and register them, so they will show up in the Pattern library.

To create a new pattern, run the following command:
`npx storefront create:pattern PatternName`

You can also create multiple patterns at once, e.g.:
`npx storefront create:pattern Pattern1 Pattern2 Patten3`


### Running Tests

* Run tests in watch-mode: `npm run test`


### Building

Just push to the GitHub Repository in the stable branch - we will cover everthing else.


## FAQ

### Adding project specific colors/fonts/icon

This applications comes with a default palette of colors, icons and typography. The related configuration files can be cound in the `config/core` directory.

We use these config files to generate CSS custom properties (found in `patterns/core/BaseLayout/variables.styl`) and render basic overviews in the pattern library (e.g., see `library/internal/ColorView.js`).

Of course, it is possible to override the default configuration your own, project-specific colors, fonts and icons. In the `config` directory you can find three empty files:
- `colors.json`
- `icons.json`
- `fonts.json`

These configuration files are empty by default, therefore the application uses the default configuration. As soon as you start adding your own colors, icons or fonts to the empty configuration files, these will be used instead of the default files.


### Adding external CSS libraries

If you want to use external CSS libraries you can install them using NPM and include the necessary files.

**Bootstrap**
1. Install the dependency: `npm install bootstrap`
2. Use the distributable, either:
    * Include it in the stylus entry file `patterns/index.styl` (preferred):
    `@import 'node_modules/bootstrap/dist/css/bootstrap.css'`
    * Import directly in the application entry file `pages/_app.js`:
    `import 'bootstrap/dist/css/bootstrap.css'`


### IE11 Compatability

By default, this application is not supporting IE11. Therefore, we have a middleware in `server/index.js` that detects if a user is coming with IE and if so, we render a page which suggests downloading a modern browser.

If you need to support IE11, you have to remove this middleware. In addition, there are a couple of APIs and features that you will need to polyfill or refactor:

**CSS Custom Properties**

The application makes heavy use of CSS Custom Properties. In order to add a fallback for IE11, you will need to perform the following steps:

- `npm install postcss-css-variables`
- Create a `postcss.config.js` and add:

```javascript
module.exports = {
  plugins: {
    'postcss-css-variables': {
      preserve: true, // set this to false if you don't need custom properties at runtime
    },
  },
}
```

