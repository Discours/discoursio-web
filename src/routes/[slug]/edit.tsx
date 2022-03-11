import { RouteDataFunc } from 'solid-app-router'
import { XmlFragment, XmlText } from 'yjs'
import Editor from '~/components/Editor'
import { useStore } from '~/store'

let slug
let body
let store

export const routeData: RouteDataFunc = (props) => {
  slug = props.params.slug
  store = useStore()
  body = new XmlFragment()
  body.insert(0, [new XmlText(body)])
}

export default () => {
  const { loadArticle, updateArticle } = useStore()[1]

  loadArticle(slug)

  return (
    <>
      <Editor body={body} collab={false} onSubmit={updateArticle} />
    </>
  )
}
