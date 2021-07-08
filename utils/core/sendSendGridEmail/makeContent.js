const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL || 'storefront@makaira.io'

export default function makeContent(mailContent) {
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
