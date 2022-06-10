const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
const SENDER_EMAIL = 'storefront@makaira.io'

module.exports = async function sendMail(data) {
  return fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: data.recipient,
            },
          ],
          subject: `[Customer contact] - ${data.firstName} ${data.surname}: ${data.subject}`,
        },
      ],
      from: {
        email: SENDER_EMAIL,
        name: `Customer`,
      },
      reply_to: {
        email: data.email,
        name: `${data.firstName} ${data.surname}`,
      },
      content: [
        {
          type: 'text/html',
          value: `
            Customer name: ${data.gender} ${data.firstName} ${data.surname} <br>
            Email: ${data.email} <br>
            Message: ${data.message}
          `,
        },
      ],
    }),
  })
}
