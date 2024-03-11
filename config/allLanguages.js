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
    locale: 'de-DE',
    prices: {
      locale: 'de-DE',
      currency: 'EUR',
    },
  },
  {
    label: 'EN',
    value: 'en',
    locale: 'en-US',
    searchRoute: '/search',
    prices: {
      locale: 'de-DE',
      currency: 'EUR',
    },
  },
]
