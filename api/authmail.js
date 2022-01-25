const { randomUUID } = require('crypto')
const { createTransport } = require('nodemailer')
const redis = require('./_redis.js')
// mail
const mailer = createTransport({
  host: process.env.MAIL_HOST,
  port: 25,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const host = 'https://new.discours.io/auth/'

export default async function handler(req, res) {
  const { email } = req.body.data
  try {
    // generate pass token
    const token = randomUUID()
    // save it in redis awaiting tokens storage
    await redis.set('token-' + token, email)
    await mailer.sendMail({
      to: email,
      from: 'welcome@discours.io',
      subject: `Добро пожаловать в Дискурс!`,
      text: 'Нажмите ссылку для подтверждения сессии: ' + host + token
    })
    res.status(200).json({ message: 'Successfully send your message!' })
  } catch (error) {
    res.status(400).json({ message: 'You submit an incorrect mail address!' })
  }
}
