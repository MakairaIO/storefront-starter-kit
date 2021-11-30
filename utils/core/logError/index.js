/**
 * Here you should implement your custom functionality
 * for monitoring and reporting errors.
 */
const TARGET_STREAM = process.env.GRAYLOG_STREAM

export default async function logError(data) {
  if (process.env.NODE_ENV == 'production') {
    try {
      const body = {
        ...data,
        message: TARGET_STREAM,
      }

      // NOTE: fields "host" and "message" are mandatory for Graylog-Requests to work, see: https://docs.graylog.org/en/3.2/pages/gelf.html
      await fetch(`${process.env.SHOP_DOMAIN}/log-error/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  } else {
    console.error(data)
  }
}
