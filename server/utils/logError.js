const LOGGING_ENDPOINT = 'https://graylog-api.makaira.io/gelf'

module.exports = async function logError(body) {
  try {
    // NOTE: fields "host" and "message" are mandatory for Graylog-Requests to work, see: https://docs.graylog.org/en/3.2/pages/gelf.html
    await fetch(LOGGING_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error(error)
  }
}
