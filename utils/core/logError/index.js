/**
 * Here you should implement your custom functionality
 * for monitoring and reporting errors.
 */
const LOGGING_ENDPOINT = 'https://graylog3api.makaira.io/gelf'
const TARGET_STREAM = 'storefront errors'

export default async function logError(data) {
  if (process.env.NODE_ENV == 'production') {
    try {
      const body = {
        ...data,
        message: TARGET_STREAM,
      }

      // NOTE: fields "host" and "message" are mandatory for Graylog-Requests to work, see: https://docs.graylog.org/en/3.2/pages/gelf.html
      await fetch(LOGGING_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  } else {
    console.error(data)
  }
}
