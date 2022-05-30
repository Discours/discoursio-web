import { Component, createMemo, Show } from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic } from '../graphql/types.gen'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
// import Row1 from '../components/Article/Row1'
import Beside from '../components/Article/Beside'
import { useI18n } from '@solid-primitives/i18n'

const Feed: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    candidates?: Partial<Shout>[]
    byTopics?: Partial<Shout>[]
    byAuthors?: Partial<Shout>[]
    byCommunities?: Partial<Shout>[]
    topics: Topic[]
    topicsLoading: boolean
  }>()

  const topics = createMemo(() => Object.keys(data.byTopics || {}))
  const articles = createMemo(() => [
    ...(data.byTopics || []),
    ...(data.byAuthors || []),
    ...(data.byCommunities || [])
  ])
  useRouteReadyState()
  return (
    <div class='flex flex-col'>
      <Show when={!!articles()}>
        <Beside
          title={t('Top topics')}
          values={topics()?.slice(0, 5)}
          beside={articles()[0]}
          wrapper={'topic'}
        />
        <Row3 articles={articles().slice(1, 4)} />
        <Row2 articles={articles().slice(4, 6)} />
        <Row3 articles={articles().slice(10, 13)} />
        <Row3 articles={articles().slice(13, 16)} />
      </Show>
    </div>
  )
}

export default Feed
