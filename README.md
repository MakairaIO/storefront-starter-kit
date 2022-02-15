# Makaira Storefront

---

1. [Getting started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
   3. [Development](#development)
2. [Core concepts](#core-concepts)
    1. [Fetching data from Makaira](#fetching-data)
    2. [Pattern Library](#pattern-library)
    3. [Content Elements](#content-elements)
    4. [Data driven approach](#data-driven)
3. [Working with the Storefront](#working-with)
    1. [Create new patterns](#create-patterns)
    2. [Running tests](#running-tests)
    3. [Building](#building)
4. [FAQ](#faq)

## <a id="getting-started"></a>1. Getting Started

---

### <a id="prerequisites"></a>1.1 Prerequisites

* [Node.js](https://nodejs.org/) v16.13.0
* recommended OS: Linux or Mac (if you are using Windows see [4.4 Windows troubleshooting](#windows-troubleshooting)

### <a id="installation"></a>1.2 Installation

*Disclaimer: The following steps assume that you will keep the upstream to the base repository for continuous updates. If you don't want that, you can skip some steps and simply clone the repository and override the default remote `origin` with your own.*

* Clone this repository using the `--origin <name>` flag to set an remote name other than `origin` (for example `upstream`)
* Configure your own origin remote using `git remote add origin <your repository url>`
* Initial push of stable branch to your own remote: `git push origin stable`
* Configure default remote to be your own remote: `git branch --set-upstream-to origin/stable`
* Install dependencies: `npm ci`
* Configure your individual `.env` file in the root directory (see `.env.example`)

### <a id="development"></a>1.3 Development

* Start development server: `npm run dev`
* Visit Pattern Library at [http://localhost:500/pali](http://localhost:5000/pali)
* Visit Storefront at [http://localhost:5000/](http://localhost:5000/)

## <a id="core-concepts"></a>2. Core concepts

The Storefront is based on the [NextJS Framework](https://nextjs.org/). Due to this we write our client-side code in [React](https://reactjs.org/).
It is recommended to have a profound knowledge of Javascript and basic understanding of both of NextJS and React.

Also, because the Storefront interacts with [Makaira](https://www.makaira.io/) a lot it is highly recommended having a basic knowledge about Makaira as well.

---

### <a id="fetching-data"></a>2.1 Fetching data from Makaira

With the Storefront we can render almost any kind of data from Makaira (products, streams, landing pages, etc.) in the form of react components (also known as "patterns" here). Therefore, for a better understanding, it is recommended that 
you have a basic knowledge about how Makaira works and how the data structure of a Makaira document (such as products and landing pages) looks like. 
For the start just imagine we have a product-document in Makaira with the URL _/test-product.html_ and the `pageType` with the value `makaira-productgroup`.

The Storefront, respectively NextJS, provides a Node.js server. So now, if we want to render that product by calling our Storefront domain with _/test-product.html_ the following happens:
1. Within `server/index.js` the Storefront takes the request url (server-side), checks if it matches some specific URLs that we want to handle in a specific way.
2. Take a look at the lines 95-100 within `server/index.js`. The page `frontend/entry`, located within the `pages` folder, will be rendered.
3. In that file, before it is rendered, a request is send to Makaira to fetch all neccesary data for that document (`fetchPageData()`) with the url _/test-product.html_.   
4. Makaira looks into its own data if it finds a document with the corresponding URL. It does!   
5. Makaira answers with a response code of 200. In the response body we have a JSON object containing a lot of data, like the `pageType`.
6. The Storefront takes the response body data and renders the page depending on the value of `pageType` (this happens within `pages/frontend/entry.js` line 100).

### <a id="pattern-library"></a>2.2 Pattern Library

One core feature of the Storefront is the Pattern Library (pali). You can access the pali by calling `/pali`.

The pali contains a summary of all components/patterns we use in our project, and a lot of important UX/design information like colors, icons, typography and buttons.

We use the pali as "source of truth" while working on new patterns: A button must have a specific color? Check if this color is configured in the pali. If so: Use it! If not: Ask the designer if he is sure about the color 
and whether you should add that to the color configuration. The text in your new pattern has to have three different font-sizes according to the screen size? Check the typography in the pali if each configuration is available or not. 
If not contact the designer that you found and inconsistency!

Our goal with this is to ensure consistency throughout the project following the convention: No colors, typographies, buttons etc. that aren't defined in the pali.

### <a id="content-elements"></a>2.3 Content elements

A powerful feature is to render content that is configured in the Makaira Page Editor. Imagine you create a Landing Page called _Home Page_ with the URL `/`. Now you add content that page, like a _Text (mehrspaltig)_ element.
You add some content to that content element, save the configuration, load the page in the Storefront, and you see: The content you just configured in the Makaira landing page is rendered in the storefront!

How does this work out? How does the Storefront know where it should render what?

Remember the first part of this documentation: [Fetching data from Makaira](#fetching-data)

We hit the `/` URL, the Storefront fetches the data from a Makaira document with the URL `/`.  The `pageType` of this document is `page`, so the `LandingPage` react component is rendered.

Within the data from that page (which is accessible as `pageData` globally from the `GlobalDataProvider`) we have the information about the content elements for that page. Take a look at line 15 in `frontend/LandingPage/index.js`.

Here we render a `ContentElements` component and pass a property `elements` (which is an array of objects). Before we step further let's go to Makaira and open the _Component Editor_. Look for the component with the name
"Text (mehrspaltig)" and check the value of the `Identifier` field. It should be `multi-column-text`. Now we come back to the `ContentElements` component. You see, that we iterate over the `elements` array. For each
entry we check, if it's `component` (which is the `Identifier` from the _Component Editor_) value matches to a key within the `components` object (line 23). If yes, we know the react component that should be rendered for 
that component and pass all data from that element as properties to the react component.

### <a id="data-driven"></a>Data driven approach

## <a id="working-with"></a>3. Working with the Storefront

---

### 3.1 <a id="create-patterns"></a>Create Patterns

The Storefront comes included with a CLI to help you generate all necessary files for new patterns and register them, so they will show up in the Pattern library.

To create a new pattern, run the following command:
`npx storefront create:pattern PatternName`

You can also create multiple patterns at once, e.g.:
`npx storefront create:pattern Pattern1 Pattern2 Patten3`


### <a id="running-tests"></a>3.2 Running Tests

* Run tests in watch-mode: `npm run test`


### <a id="building"></a>3.3 Building

Just push to the GitHub Repository in the stable branch - we will cover everthing else.


## <a id="faq"></a>4. FAQ

---

### 4.1 Adding project specific colors/fonts/icon

This applications comes with a default palette of colors, icons and typography. The related configuration files can be cound in the `config/core` directory.

We use these config files to generate CSS custom properties (found in `patterns/core/BaseLayout/variables.styl`) and render basic overviews in the pattern library (e.g., see `library/internal/ColorView.js`).

Of course, it is possible to override the default configuration your own, project-specific colors, fonts and icons. In the `config` directory you can find three empty files:
- `colors.json`
- `icons.json`
- `fonts.json`

These configuration files are empty by default, therefore the application uses the default configuration. As soon as you start adding your own colors, icons or fonts to the empty configuration files, these will be used instead of the default files.


### 4.2 Adding external CSS libraries

If you want to use external CSS libraries you can install them using NPM and include the necessary files.

**Bootstrap**
1. Install the dependency: `npm install bootstrap`
2. Use the distributable, either:
    * Include it in the stylus entry file `patterns/index.styl` (preferred):
    `@import 'node_modules/bootstrap/dist/css/bootstrap.css'`
    * Import directly in the application entry file `pages/_app.js`:
    `import 'bootstrap/dist/css/bootstrap.css'`


### 4.3 IE11 Compatability

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

### <a id="windows-troubleshooting"></a>4.4 Windows troubleshooting

