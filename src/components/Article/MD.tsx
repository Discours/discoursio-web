import MD from 'markdown-it'
import mdfig from 'markdown-it-implicit-figures'
import mdmark from 'markdown-it-mark'
import mdc from 'markdown-it-container'
import mdlinks from 'markdown-it-replace-link'
import { createSignal, createEffect } from 'solid-js'

const mit = MD({
  html: true,
  linkify: true,
  typographer: true
})
mit.use(mdmark)
mdc(mit, 'tooltip', { marker: '///' }) // tooltip
mdc(mit, 'mark', { marker: '==' }) // выделение
mit.use(mdfig, {
  dataType: false, // <figure data-type="image">
  figcaption: true // <figcaption>alternative text</figcaption>
})
mit.use(mdlinks)

export default (props: { body: string }) => {
  const [rendered, setRendered] = createSignal('')

  createEffect(() => {
    const pb = props.body
    setRendered(pb?.startsWith('<') ? pb : mit.render(pb))
  })

  return <div innerHTML={rendered()}></div>
}
