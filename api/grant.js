import { createRequest } from "@urql/core"
import getSession from '../src/graphql/q/auth-session'

export default async function handler(req, res) {
    let code
    try { code = req.url.split('/auth/key-')[1] }
    catch(e) { console.error(e) }
    if (code) {
        const gqr = createRequest(getSession, { code })
        res.setHeader('set-cookie', )
        res.status(200, 'ok!')
    }
    else res.status(404)
}