/**
 * The Common.js export here is intentional since
 * we need to import this file in server.js as well
 * and Next.js currently does not support ESM modules.
 */
module.exports = [
  {
    label: 'DE',
    value: 'de',
    searchRoute: '/suche',
    blogRoute: '/blog/de',
    prices: {
      locale: 'de-DE',
      currency: 'EUR',
    },
  },
  {
    label: 'EN',
    value: 'en',
    searchRoute: '/search',
    blogRoute: '/blog/en',
    prices: {
      locale: 'de-DE',
      currency: 'EUR',
    },
  },
]
