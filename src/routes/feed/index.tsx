import NavTopics from '~/components/Nav/Topics'
import Beside from '~/components/Article/Beside'
import ArticleList from '~/components/Article/List'
import { shuffle } from '~/lib/utils'
import { createMemo } from 'solid-js'
import { useStore } from '~/store'
export const prerender = true

// TODO: update data
const sets = ['reviewed', 'subscribed', 'candidates', 'commented']

// export let update // { subscribed reviewed recents top-overall top-viewed }
export default (props) => {
  const store = useStore()
  const { currentUser } = store[0]
  const { authorSubscriptions } = store[1]
  const topicset = new Set([]) // FIXME
  const dataset = [] // FIXME

  return (
    <section class='feed'>
      <NavTopics topics={shuffle(Array.from(topicset)).slice(0, 9)} />
      <Beside
        beside={dataset.slice(0, 1)}
        values={authorSubscriptions()}
        wrap={'author'}
        settings={{ title: '' }}
      />
      <ArticleList articles={dataset.slice(2)} currentPage={0} onSetPage={() => {}} totalPagesCount={1} />
    </section>
  )
}
