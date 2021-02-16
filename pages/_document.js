import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

          {/*
          <link rel="dns-prefetch" href="https://cdn.polyfill.io" />
          <link rel="preconnect" href="https://cdn.polyfill.io" />
           */}

          <Favicon />
        </Head>
        <body id="body">
          <Main />

          {/*
           *   WARNING: Do not polyfill Symbol.prototype.description -> it will break Portals in both Safari13 and IE11
           *   -> see: https://github.com/facebook/react/issues/8379#issuecomment-263962787 and https://github.com/facebook/react/issues/8379#issuecomment-418542006
           *
           *   WARNING: Do not remove the `gated` flag from the polyfill URL below because it prevents corner cases where native APIs clash with provided polyfills.

          <script
            crossOrigin="anonymous"
            src="https://cdn.polyfill.io/v3/polyfill.min.js?flags=gated&features=Array.from,Array.isArray,Array.prototype.entries,Array.prototype.every,Array.prototype.filter,Array.prototype.find,Array.prototype.forEach,Array.prototype.includes,Array.prototype.indexOf,Array.prototype.keys,Array.prototype.map,Array.prototype.reduce,Array.prototype.some,Array.prototype.values,ArrayBuffer,console,DataView,Date.now,Date.prototype.toISOString,document,Element,Event,fetch,Function.prototype.bind,IntersectionObserver,Intl,JSON,localStorage,Map,Math.trunc,modernizr:es5object,MutationObserver,Number.isInteger,Number.isNaN,Object.assign,Object.entries,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.isExtensible,Object.preventExtensions,Object.setPrototypeOf,Object.values,Promise,Reflect,Reflect.construct,requestAnimationFrame,Set,String.prototype.includes,String.prototype.repeat,String.prototype.startsWith,String.prototype.trim,Symbol,Symbol.iterator,URL,WeakMap,WeakSet,NodeList.prototype.forEach,IntersectionObserver,IntersectionObserverEntry"
          />

           */}

          <NextScript />
        </body>
      </Html>
    )
  }
}

function Favicon() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/assets/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
    </>
  )
}
