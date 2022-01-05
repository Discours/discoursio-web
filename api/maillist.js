const mailgun = require('mailgun-js')({
	apiKey: MAILGUN_API_KEY, 
	domain: process.env.MAILGUN_DOMAIN
})
const list = mailgun.lists('services@discours.io')

export default async function handler(req, res) {
	const { email } = req.body.data
	list.members().create({ subscribed: true, address: email }, (err, data) => {
		if(err) {
			console.error(err)
			res.status(500)
		}
		else {
			res.status(200).json(data)
		}
	})
}
