const fetch = require('isomorphic-unfetch')
import makeContent from './makeContent'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

export default async function sendSendGridEmail(data = {}) {
  if (!data.email || !data.message) {
    return {
      success: false,
      message: 'Missing field email/message in data!',
    }
  }

  const content = makeContent(data)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(content),
  }

  try {
    const response = await fetch(SENDGRID_API, options)
    if (response.status === 202) {
      return {
        success: true,
      }
    } else {
      const body = await response.json()
      return {
        success: false,
        message: JSON.stringify(body),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: error.message || 'Server internal error!',
    }
  }
}
