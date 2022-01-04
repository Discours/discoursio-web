const redis = require('./redis.js')
const cookieKey = 'discorsio-auth'

export default async function handler(req, res) {
	if (req.cookies.includes(cookieKey)) {
		const token = req.cookies[cookieKey]
		const data = await redis.get(token)
		if (!data) throw new Error('Unable to find authorization data')
		res.status(200).rawBody(data)
	}
	res.status(404)
}
