/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const { contact, message } = params
  const r = await fetch('/api/feedback', {
    method: 'post',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=utf-8'
    },
    body: await JSON.stringify({ contact, message })
  })
  return { body: { ok: r.ok } }
}
