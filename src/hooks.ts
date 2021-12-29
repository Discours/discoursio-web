export async function handle({ request, resolve }) {
	let subscriptions  = {}
	const parts = decodeURI(request.headers.cookie).split(";")
	await parts.forEach(async (item) => {
	   const [key, value] = item.split("=")
	   if(value) subscriptions[key] = await JSON.parse(value)
   	})
	let subdomain = request.host && request.host.split('.')[0]
	if (subdomain == 'discours') subdomain = ''
	request.locals = { subdomain, subscriptions }
	return await resolve(request)
}
