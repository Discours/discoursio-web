const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
}

const method = 'POST'

const subscribe = async (slug, what) => {
	let subscribed
	console.log('topic: subscribing')
	const r = await fetch('/subscribe', {
		method,
		headers,
		body: JSON.stringify({ slug, what })
	})
	if (r.ok) subscribed = true
	return subscribed
}

const unsubscribe = async (slug, what) => {
	let subscribed
	console.log('topic: unsubscribing')
	const r = await fetch('/unsubscribe', {
		method,
		headers,
		body: JSON.stringify({ slug, what })
	})
	if (r.ok) subscribed = false
	return subscribed
}

const getSubscriptions = async (coo, entity) => {
	if (coo.replace(entity + '=', '') !== coo) {
		return await JSON.parse(coo.split(entity + '=')[1].split(';')[0])
	} else return
}

export { subscribe, unsubscribe, getSubscriptions }
