import { createComputed, createMemo, lazy, useTransition } from 'solid-js'
import { useStore } from '../../store'
const Home = lazy(() => import('./Home'))

export default function () {
  const stores = useStore()
  const store = stores[0]
  const { loadArticles, setPage } = stores[1]
  const { token, appName } = store
  const tab = createMemo(() => {
    const search = window.location.href.split('?')[1]

    if (!search) return token ? 'feed' : 'all'

    const query = new URLSearchParams(search)

    return query.get('tab')
  })
  const [, start] = useTransition()
  const getPredicate = () => {
    switch (tab()) {
      case 'feed':
        return { myFeed: true }
      case 'all':
        return {}
      case undefined:
        return undefined
      default:
        return { topic: tab() }
    }
  }
  const handleSetPage = (page) => {
    start(() => {
      setPage(page)
      loadArticles(getPredicate())
    })
  }

  createComputed(() => loadArticles(getPredicate()))

  return Home({ handleSetPage, appName, token, tab, store })
}
