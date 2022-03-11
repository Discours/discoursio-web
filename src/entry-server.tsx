/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderToStringAsync } from 'solid-js/web'
import { StartServer, createHandler, type Middleware } from 'solid-start/components'
import { inlineServerModules } from 'solid-start/server'

function renderPage() {
  return async ({
    request,
    manifest,
    headers,
    context = {}
  }: {
    request: Request
    headers: Response['headers']
    manifest: Record<string, any>
    context?: Record<string, any>
  }) => {
    const markup = await renderToStringAsync(() => (
      <StartServer context={context} url={request.url} manifest={manifest} />
    ))

    headers.set('Content-Type', 'text/html')

    return new Response(markup, {
      status: 200,
      headers
    })
  }
}

export default createHandler(inlineServerModules, renderPage)
