const { createClient } = require('redis')
// redis
const redis = createClient({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PASS
})
redis.on('error', (err) => console.log('redis: client error', err))

module.exports = redis
