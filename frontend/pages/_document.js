import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <link
            href="/static/dist/sc-main.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <body>
          <Main />

          {/*
           *   WARNING: Do not polyfill Symbol.prototype.description -> it will break Portals in both Safari13 and IE11
           *   -> see: https://github.com/facebook/react/issues/8379#issuecomment-263962787 and https://github.com/facebook/react/issues/8379#issuecomment-418542006
           */}
          <script
            crossOrigin="anonymous"
            src="https://cdn.polyfill.io/v3/polyfill.min.js?features=Array.prototype.findIndex,String.prototype.repeat,CustomEvent,NodeList.prototype.forEach,Element.prototype.closest,Array.from,Array.isArray,Array.prototype.entries,Array.prototype.filter,Array.prototype.find,Array.prototype.forEach,Array.prototype.includes,Array.prototype.indexOf,Array.prototype.keys,Array.prototype.map,Array.prototype.reduce,Array.prototype.some,Array.prototype.values,ArrayBuffer,console,DataView,Date.now,document,Event,Function.prototype.bind,getComputedStyle,Map,Math.trunc,modernizr:es5object,MutationObserver,Object.assign,Object.entries,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.is,Object.isExtensible,Object.preventExtensions,Object.setPrototypeOf,Promise,Set,String.prototype.includes,String.prototype.trim,Symbol,Symbol.for,Symbol.iterator,Symbol.toStringTag,WeakMap,WeakSet,URL,String.prototype.startsWith"
          />

          <NextScript />

          <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
