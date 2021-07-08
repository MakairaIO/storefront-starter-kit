const fetch = require('isomorphic-unfetch')

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL || 'storefront@makaira.io'

function generateSendGridBody(mailContent) {
  return {
    personalizations: [
      {
        to: [{ email: mailContent.recipient }],
        subject: `[Customer contact] - ${mailContent.firstName} ${mailContent.surname}: ${mailContent.subject}`,
      },
    ],
    from: {
      email: SENDGRID_EMAIL,
      name: 'Customer',
    },
    reply_to: {
      email: mailContent.email,
      name: `${mailContent.firstName} ${mailContent.surname}`,
    },
    content: [
      {
        type: 'text/html',
        value: `
          Customer name: ${mailContent.gender} ${mailContent.firstName} ${mailContent.surname} <br>
          Email: ${mailContent.email} <br>
          Message: ${mailContent.message}
        `,
      },
    ],
  }
}

export default async function handler(req, res) {
  const body = req.body
  if (!body.email) {
    res
      .status(400)
      .send({ message: 'Bad request: missing field email in body!' })
  }
  const content = generateSendGridBody(body)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(content),
  }

  try {
    const response = await fetch(SENDGRID_API, options)
    if (response.status === 202) {
      res.status(200).json({})
    } else {
      const body = await response.json()
      res.status(500).json(body)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({})
  }
}
