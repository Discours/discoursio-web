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

const createCookie = (name: string, value: any, days: number = 0) => {
    let expires = ""
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }
    return name + "=" + value + expires + "; path=/"
}

const getCookie = (c_name: string) => {
    if (document?.cookie?.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
		console.debug(c_start)
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

const getSubscriptions = async (entity) => {
	let r = []
	try { r = await JSON.parse(getCookie(entity)) }
	catch(e) { console.error(e) }
	return r
}

export { createCookie, getCookie, subscribe, unsubscribe, getSubscriptions }
