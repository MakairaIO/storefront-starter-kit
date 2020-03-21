const express = require('express')
const next = require('next')
const cors = require('cors')
const allLanguages = require('../config/allLanguages')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.NODE_PORT ? process.env.NODE_PORT : 5000
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(cors({ origin: true, credentials: true }))

    /**
     * Route handler for all static assets, e.g. images, ...
     */
    server.get('/assets/*', (req, res) => {
      return handle(req, res)
    })

    /**
     * Route handler for pattern library
     */
    server.get('/pali/variants/:id', (req, res) => {
      app.render(req, res, '/library/variant', {
        ...req.params,
      })
    })

    server.get('/pali', (req, res) => {
      app.render(req, res, '/library/entry', req.query)
    })

    /**
     * Generate search routes for each languages
     */
    allLanguages.forEach(lang => {
      server.get(lang.searchRoute, (req, res) => {
        app.render(req, res, '/frontend/search', req.query)
      })
    })

    /**
     * Route handler page requests
     */
    server.get(/^(.*)$/, (req, res) => {
      app.render(req, res, '/frontend/entry', {
        seoUrl: req.params[0],
        ...req.query,
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err

      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
