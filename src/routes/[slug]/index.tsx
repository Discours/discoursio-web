import { RouteDataFunc } from 'solid-app-router'
import { onMount } from 'solid-js'
import { Show } from 'solid-js/web'
import ArticleFull from '~/components/Article/Full'
import AuthorFull from '~/components/Author/Full'
import { useStore } from '~/store'

let slug

export const routeData: RouteDataFunc = ({ params }) => (slug = params.slug)

export default () => {
  let state

  onMount(() => {
    const store = useStore()

    if (store) {
      state = store[0]
      const actions = store[1]
  
      actions.loadArticle(slug)
      actions.loadComments(slug)
    }
  })
  const article = () => state.articles[slug]
  const author = () => state.authors[slug.replace('@', '')]

  return (
    <Show when={slug.startsWith('@')} fallback={<ArticleFull article={article()} />}>
      <AuthorFull author={author()} />
    </Show>
  )
}

