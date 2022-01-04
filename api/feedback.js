const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: 25,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
})

export default async function handler(req, res) {
	const { contact, message } = req.query
	try {
		await transporter.sendMail({
			to: 'welcome@discours.io',
			from: 'robot@discours.io',
			subject: `Обратная связь: ${contact}`,
			text: message
		})
		res.status(200).json({ message: 'Successfully send your message!' })
	} catch (error) {
		res.status(400).json({ message: 'You submit an incorrect mail address!' })
	}
}
