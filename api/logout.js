const redis = require('./_redis.js')
const cookieKey = 'discours-auth'

export default async function handler(req, res) {
	const token = req.cookies[cookieKey]
	if (token) await redis.delete(token)
	res.setHeader('Set-Cookie', `${cookieKey}=""; SameSite=Lax; Secure;`)
	return res.status(200)
}
