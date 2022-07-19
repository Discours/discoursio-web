const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })
const MailComposer = require("nodemailer/lib/mail-composer");

export default async function handler(req, res) {
  const { contact, message } = req.query
  try {
    const mail = new MailComposer({
      to: 'welcome@discours.io',
      from: contact + ' <robot@discours.io>',
      subject: `Feedback: ${contact}`,
      body: message
    }).compile()
    mail.build((err, mail) => {
      if (err) res.status(400).json(err)
      else mailgun.messages().send(mail, (err, message) => {
        if (err) res.status(400).json(err)
        else res.status(200).json({ message }) // message is response from mailgun
      })
    })
  } catch (error) {
    res.status(400).json(error)
  }
}
