const mailchimp = require('mailchimp-node')(process.env.MAILCHIMP_KEY)

export default async function handler(req, res) {
	const { email } = req.body.data
	try {
		mailchimp.list.createMember(
			process.env.MAILCHIMP_LIST,
			{ email, status: 'subscribed' },
			(err, member) => (err ? console.error(err) : console.log(member))
		)
		res.status(200).json({ message: 'Successfully subscribed' })
	} catch (error) {
		res.status(500)
	}
}
