import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery, OperationResult, useClient } from 'solid-urql'
import articlesForTopics from '../graphql/q/articles-for-topics'
import topicsAll from '../graphql/q/topics-all'
import { useZine } from '../store/zine'
import { usePromiseQuery } from '../utils/promiseQuery'
import authorsBySlugs from '../graphql/q/authors-by-slugs'
import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { Shout, User } from '../graphql/types.gen'

export const TopicData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const [{ page, size }, ] = useZine()
  // TODO: use more and pagination
  const [data, state] = createQuery({
    query: articlesForTopics,
    variables: { slugs: [args.params.slug], page, size }
  })
  const [tdata, tstate] = createQuery({ query: topicsAll })
  const [promiseQuery, ] = usePromiseQuery(useClient())
  const [topicAuthors, setAuthors] = createSignal([])
  const authorslugs = createMemo(() => {
    let aaa: string[] = []
    if(!state()?.fetching) data()?.shoutsByTopics
      .forEach((s: Partial<Shout>) => s.authors?.forEach((a: Partial<User>) => aaa.push(a.slug || 'discours')))
    return Array.from(new Set(aaa))
  })
  createEffect(() => {
    promiseQuery(authorsBySlugs, { slugs: authorslugs()})
      .then(({ data, error }: OperationResult) => {
        if (!error) setAuthors(data.getUsersBySlugs)
      })
  })

  return {
    get articles() {
      return data()?.shoutsByTopics
    },
    get loading() {
      return state()?.fetching
    },
    get topics() {
      return tdata()?.topicsBySlugs
    },
    get topicsLoading() {
      return tstate()?.fetching
    },
    get authors() {
      return topicAuthors()
    },
    get lang() {
      return location.query.locale ? (location.query.locale as string) : locale()
    },
    get slug() {
      return args.params.slug
    }
  }
}
