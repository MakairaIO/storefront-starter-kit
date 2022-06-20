const fs = require('fs')
const express = require('express')
const next = require('next')
const cors = require('cors')
const allLanguages = require('../config/allLanguages')
const parser = require('ua-parser-js')
const bodyParser = require('body-parser')
const sendSendGridEmail = require('../utils/core/sendSendGridEmail')

const logError = require('./utils/logError')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || process.env.NODE_PORT || 5000
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(cors({ origin: true, credentials: true }))
    server.use(bodyParser.json())

    /**
     * Route handler for robots.txt
     */
    server.get('/robots.txt', (req, res) => {
      res
        .status(200)
        .send(
          `Sitemap: ${process.env.SHOP_DOMAIN}/${allLanguages[0].value}/sitemap.xml?instance=${process.env.MAKAIRA_API_INSTANCE}`
        )
    })

    /**
     * Route handler for all static assets, e.g. images, ...
     */
    server.get('/assets/*', (req, res) => {
      return handle(req, res)
    })

    /**
     * Middleware to detect if a user is using Internet Explorer.
     */
    server.use((req, res, next) => {
      const ua = parser(req.headers['user-agent'])

      if ('IE' !== ua.browser.name) {
        next()
      } else {
        app.render(req, res, '/frontend/browser', req.query)
      }
    })

    /**
     * Route handler for preview endpoint.
     */
    server.get('/preview', (req, res) => {
      app.render(req, res, '/frontend/preview', {
        ...req.params,
      })
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
     * Generate search routes for each language
     */
    allLanguages.forEach((lang) => {
      server.get(lang.searchRoute, (req, res) => {
        app.render(req, res, '/frontend/search', req.query)
      })
    })

    server.post('/log-error', (req, res) => {
      logError(req.body)
      res.json()
    })

    /**
     * Route handler page requests
     */

    //API call sendgrid send contact email

    server.post('/api/send-email', async (req, res) => {
      try {
        const sendGridRaw = await sendSendGridEmail(req.body)
        const { status, statusText } = sendGridRaw
        if (statusText !== 'Accepted') {
          let error = new Error()
          const sendGridRes = await sendGridRaw.json()

          error.code = status
          error = { ...error, ...sendGridRes }

          throw error
        }
        return res.status(200).end()
      } catch (e) {
        return res.status(e.code).json(e)
      }
    })

    server.get(/^(.*)$/, (req, res) => {
      app.render(req, res, '/frontend/entry', {
        seoUrl: req.params[0],
        ...req.query,
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    // DO NOT MODIFY THIS PART!
    if (process.env.RUNS_ON_HEROKU === 'true') {
      server.listen('/tmp/nginx.socket', (err) => {
        if (err) throw err

        console.log('> Ready on /tmp/nginx.socket')
        // Tell heroku, that the application is ready
        fs.openSync('/tmp/app-initialized', 'w')
      })
      return
    }
    // END

    server.listen(port, (err) => {
      if (err) throw err

      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
