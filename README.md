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
   2. [Add project specific colors/fonts/icons](#add-colors-fonts-icons)
      1. [Colors](#add-colors)
      2. [Fonts](#add-fonts)
      3. [Icons](#add-icons)
   3. [Make use a base components](#use-base-components)
   4. [Make use of base utility functions](#use-base-utils)
      1. [Get Image Links](#get-image-links)
   5. [Running tests](#running-tests)
   6. [Building](#building)
4. [FAQ](#faq)
   1. [Adding external CSS libraries](#external-css-libraries)
   2. [IE11 Compatability](#ie11-compatibility)
   3. [Updating the robots.txt](#update-robots-txt)
5. [Troubleshooting](#troubleshooting)
   1. [Error: listen EADDRINUSE: address already in use :::5000](#port-in-use)
   2. [macOS Monterey](#mac-os)

## <a id="getting-started"></a>1. Getting Started

---

### <a id="prerequisites"></a>1.1 Prerequisites

- [Node.js](https://nodejs.org/) v16.13.0
- recommended OS: Linux or Mac

### <a id="installation"></a>1.2 Installation

_Disclaimer: The following steps assume that you will keep the upstream to the base repository for continuous updates. If you don't want that, you can skip some steps and simply clone the repository and override the default remote `origin` with your own._

- Clone this repository using the `--origin <name>` flag to set an remote name other than `origin` (for example `upstream`)
- Configure your own origin remote using `git remote add origin <your repository url>`
- Initial push of stable branch to your own remote: `git push origin stable`
- Configure default remote to be your own remote: `git branch --set-upstream-to origin/stable`
- Install dependencies: `npm ci`
- Configure your individual `.env` file in the root directory (see `.env.example`)

### <a id="development"></a>1.3 Development

- Start development server: `npm run dev`
- Visit Pattern Library at [http://localhost:500/pali](http://localhost:5000/pali)
- Visit Storefront at [http://localhost:5000/](http://localhost:5000/)

## <a id="core-concepts"></a>2. Core concepts

The Storefront is based on the [NextJS Framework](https://nextjs.org/). Due to this we write our client-side code in [React](https://reactjs.org/).
It is recommended to have a profound knowledge of Javascript and basic understanding of both of NextJS and React. The common [React beginners guide](https://egghead.io/courses/the-beginner-s-guide-to-react) 🎥 will help you to gain knowledge and understand the concepts.

Also, because the Storefront interacts with [Makaira](https://www.makaira.io/) a lot, it is highly recommended having a basic knowledge about Makaira as well. But no worries, we will introduce some key concepts in the following document.

---

### <a id="fetching-data"></a>2.1 Fetching data from Makaira

With the Storefront we can render almost any kind of data from Makaira (products, product lists, landing pages, etc.) in the form of react components (also known as "patterns" here). Therefore, for a better understanding, it is recommended that you have a basic knowledge about how Makaira works and how the data structure of a Makaira document (such as products and landing pages) look like.
For the start just imagine we have a document in Makaira with the URL _/test-product.html_ and the `pageType` with the value `makaira-productgroup` - a product document.

The Storefront, respectively NextJS, provides a Node.js server. If we want to render that product by calling our Storefront domain with _/test-product.html_ the following happens:

1. Within `server/index.js` the Storefront takes the request url and decides what to do with it.
2. Our URL matches at lines 95-100 within `server/index.js`. The page `frontend/entry`, located within the `pages` folder, will be rendered.
3. In that file, before it is rendered, a request is sent to Makaira to fetch all necessary data for that document (`fetchPageData()`) with the url _/test-product.html_
4. Makaira looks into its own data if it finds a document with the corresponding URL. It does!
5. Makaira answers with a response code of 200. In the response body we have a JSON object containing a lot of data, like the `pageType`.
6. The Storefront takes the response body data and renders the page depending on the value of `pageType` (this happens within `pages/frontend/entry.js` line 100).

### <a id="pattern-library"></a>2.2 Pattern Library

One core feature of the Storefront is the Pattern Library (Pali). You can access the Pali by accessing the path `/pali`.

The Pali contains a summary of all components/patterns we use in our project, and a lot of important UX/design information like colors, icons, typography and buttons.

We use the Pali as "source of truth" while working on new patterns: A button must have a specific color? Check if this color is configured in the Pali. If so: Use it! If not: Ask the designer if he is sure about the color and whether you should add that to the color configuration. The text in your new pattern has to have three different font-sizes according to the screen size? Check the typography in the Pali if each configuration is available or not.
If not contact the designer that you found and inconsistency!

Our goal with this is to ensure consistency throughout the project following the convention: No colors, typographies, buttons etc. should be used that aren't defined in the Pali. Further we strongly recommend to make use of the [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) 📖 approach like that so your Storefront stays maintainable.

We'll cover the part on how to work with the Pali later in this document (see [3. Working with the Storefront](#working-with)).

### <a id="content-elements"></a>2.3 Content elements

A powerful feature is to render content that is configured in the Makaira Page Editor. Imagine you create a Landing Page called _Home Page_ with the URL `/`. Now you add content that page, like a _Text (mehrspaltig)_ element.
You add some content to that element, save the configuration, load the page in the Storefront, and you see: The content you just configured in the Makaira landing page is rendered in the storefront!

How does this work out? How does the Storefront know where it should render which component?

Remember the first part of this guide: [2.1 Fetching data from Makaira](#fetching-data)?

We hit the `/` URL, the Storefront fetches the data from a Makaira document with the URL `/`. The `pageType` of this document is `page`, so the `LandingPage` react component is rendered.

Within the data from that page (which is accessible as `pageData` globally from the `GlobalDataProvider`) we have the information about the content elements for that page. Take a look at line 15 in `frontend/LandingPage/index.js`.

Here we render a `ContentElements` component and pass a property `elements` (which is an array of objects). Before we step further let's go to Makaira and open the _Component Editor_. Look for the component with the name "Text (mehrspaltig)" and check the value of the `Identifier` field. It should be `multi-column-text`. Now we come back to the `ContentElements` component. You see, that we iterate over the `elements` array. For each
entry we check, if it's `component` (which is the `Identifier` from the _Component Editor_) value matches to a key within the `components` object (line 23). If yes, we know the react component that should be rendered for that component and pass all data from that element as properties to the react component.

### <a id="data-driven"></a>Data driven approach

Most of our components/patterns don't fetch any data. They receive their properties according to the document in Makaira.

It is important to consider that while working with the Storefront and the Pattern Library. All components that you see in the Pali work with dummy data (check out the `variants.js` file within a pattern folder).

When a component is rendered for the client remember the part [2.3 Content elements](#content-elements). Within the `ContentElements` component the specific component is rendered in this way `<Component {...entry.properties.content} />`.
As you can see, we just destructure the `content` of the `entry` and pass all this data as properties.

To render a component within the Pali it works a bit different. Because here we don't fetch any data from Makaira we work with dummy data. Take a look into the `variants.js` file from the `MultiColumnText` component.
It exports an array of objects. Each object represents a _variant_ of that component. The `name` is just to give that variant a short explanation. More interesting is the `props` object. Everything that is written here will be passed
to the component as properties. So a _variant_ basically means that there are other values for some properties.

## <a id="working-with"></a>3. Working with the Storefront

---

### 3.1 <a id="create-patterns"></a>Create Patterns

The Storefront comes included with a CLI to help you generate all necessary files for new patterns and register them, so they will show up in the Pattern library.

To create a new pattern, run the following command:
`npx storefront create:pattern PatternName`

You can also create multiple patterns at once, e.g.:
`npx storefront create:pattern Pattern1 Pattern2 Patten3`

### <a id="add-colors-fonts-icons"></a>3.2 Add project specific colors/fonts/icons

This application comes with a default palette of colors, icons and typography. The related configuration files can be found in the `config/core` directory.

We use these config files to generate CSS custom properties (e.g, in `patterns/core/BaseLayout/colors.styl`) and render basic overviews in the pattern library (e.g., see `library/internal/ColorView.js`).

Of course, it is possible to override the default configuration with your own, project-specific colors, fonts and icons. In the `config` directory you can find three empty files:

- `colors.json`
- `icons.json`
- `fonts.json`

These configuration files are empty by default, therefore the application uses the default configuration. As soon as you start adding your own colors, icons or fonts to the empty configuration files, these will be used instead of the default files.

#### <a id="add-colors"></a>3.2.1 Colors

To add your own colors, configure `config/colors.json`. Each color has the following pattern:

```
  "Primary": {
    "value": "#4F5967",
    "variableName": "--primary",
    "group": "core"
  },
```

`value` must contain a valid CSS color. This can be a HEX color like in the example `#4F5967` but it can also be a rgba or even a gradient.

`variableName` is the name of the CSS variable we will provide. The above example could be used as `var(--primary)`.

`group` is only important for the Pali. If you navigate to the "Colors" area within the Pali you can see, that the colors are grouped. You can choose whatever name you want for a group.

#### <a id="add-fonts"></a>3.2.2 Fonts

For your own fonts, we expect your files to be placed within `public/assets/fonts`.

To add custom fonts, configure `config/fonts.json`. Each font has the following pattern:

```
"FiraSans Light": {
"family": "FiraSans",
"fileName": "FiraSans-Light",
"weight": 300,
"isItalic": false,
"fileTypes": ["woff2", "woff", "ttf"]
},
```

Based on this configuration our build process generates a `fonts.styl` file within `patterns/core/BaseLayout`. This file contains all CSS `font-face` we use in the project.

Within this file, the above configuration will result in this:

```
@font-face
  font-display fallback
  font-family FiraSans
  font-weight 300
  src url('/assets/fonts/core/FiraSans-Light.woff2') format('woff2'), url('/assets/fonts/core/FiraSans-Light.woff') format('woff'), url('/assets/fonts/core/FiraSans-Light.ttf') format('truetype')
```

**Important note:** When you add you own font family you'll have to change or override the `--font-family-regular` CSS variable from `patterns/core/BaseLayout/variables.styl`.

#### <a id="add-icons"></a>3.2.3 Icons

Icon files must be placed as SVG within `public/assets/svgs`.

To add custom icons, configure `config/icons.json`. Each icon has the following pattern:

```
  "Shopping Cart": {
    "value": "cart"
  },
```

`value` is both the name of the file (`cart.svg`) and the value of the `symbol` property of the `Icon` component (e.g `<Icon symbol="cart"/>`)

### <a id="use-base-components"></a>3.3 Make use a base components

In order to reduce code duplications and to prevent us from writing components for common use cases over and over again we have some "Base components" which we use almost everywhere.

For example for headlines, buttons and text content: We don't want to define markup and CSS for these things in every pattern again and again if we know that they always look the same.

So take a look into these components:

- `<Heading />` for headlines
- `<CopyText />` for text content
- `<ConditionalLink />` if you might have an anchor, but it's also possible that you don't
- `<Button />` for any kind of button
- `<Icon />` for icons that you defined in the icon configuration (see [2.3 Icons](#add-icons))

They cover some common cases.

### <a id="use-base-utils"></a>3.4 Make use of base utility functions

#### <a id="get-image-links"></a>3.4.1 Get image links

By default, we store images that are added via Makaira components either in an Amazon S3 Bucket or in Cloudinary. Usually images of products are stored there during the import into Makaira as well.

In order to get tie image links we have a utility function `getImageLink` which is defined within our `<ConfigurationProvider />`

### <a id="running-tests"></a>3.5 Running Tests

- Run tests in watch-mode: `npm run test`

### <a id="building"></a>3.4 Building

Just push to the GitHub Repository in the stable branch - we will cover everything else.

## <a id="faq"></a>4. FAQ

---

### <a id="external-css-libraries"></a>4.1 Adding external CSS libraries

If you want to use external CSS libraries you can install them using NPM and include the necessary files.

**Bootstrap**

1. Install the dependency: `npm install bootstrap`
2. Use the distributable, either:
   - Include it in the stylus entry file `patterns/index.styl` (preferred):
     `@import 'node_modules/bootstrap/dist/css/bootstrap.css'`
   - Import directly in the application entry file `pages/_app.js`:
     `import 'bootstrap/dist/css/bootstrap.css'`

### <a id="ie11-compatibility"></a>4.2 IE11 Compatability

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

### <a id="update-robots-txt"></a>4.3 Updating the robots.txt

To archive a dynamic sitemap based on the deployed shop domain and the api instance connected with in the `robots.txt` we serve it by the `server/index.js`. You can adjust the response by the handler to your needs.

## <a id="faq"></a>5. Troubleshooting

---

### <a id="port-in-use"></a>5.1 Error: listen EADDRINUSE: address already in use :::5000

Sometimes it might happen that you get this error in your console while trying to start the Storefront. This can have multiple reasons. The most common is that you already have a Storefront running on that port and forgot to
stop the process properly. In that case: Just stop the Storefront that already runs on that port. If the terminal of that process isn't open anymore or stopping the process doesn't work you can try this:

On Mac/Linux:

```
lsof -i tcp:5000
kill -9 PID
```

On Windows:

```
netstat -ano | findstr :5000
tskill typeyourPIDhere
```

### <a id="mac-os"></a>5.1 macOS Monterey

If, after updating to macOS Monterey, you're facing this error message while trying to start the Storefront: `Error: listen EADDRINUSE: address already in use :::5000` check out this page: https://developer.apple.com/forums/thread/682332
