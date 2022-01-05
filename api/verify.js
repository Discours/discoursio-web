const redis = require('./_redis.js')

export default async function handler(req, res) {
	const { token } = req.query
	try {
		const email = await redis.get(token)
		if (email) res.status(200)
		else res.status(404)
	} catch (error) {
		res.status(500)
	}
}
