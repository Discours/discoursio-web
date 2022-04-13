import { Component, For } from 'solid-js'
import { useRouteData, NavLink } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, User } from '../graphql/types.gen'

const Feed: Component = () => {
  const data = useRouteData<{
    loading: boolean
    articles: Partial<Shout>
    candidates?: Partial<Shout>
    myTopics?: string[]
    myAuthors?: string[]
    myCommunities?: string[]
  }>()

  useRouteReadyState()

  const sortedArticles = Object.entries(data.articles).sort(
    (entry1, entry2) => entry2[1].date - entry1[1].date
  )

  return (
    <div class='flex flex-col'>
      <div class='my-2 lg:my-10 pt-5 pb-10 px-3 lg:px-12 container'>
        <div class='mb-10 lg:flex justify-center'>
          <div class='space-y-10'>
            <For each={sortedArticles}>
              {([id, article]: [string, Partial<Shout>]) => (
                <NavLink
                  href={`/blog/${id}`}
                  class='block px-3 lg:px-0 text-md mx-auto mb-10 pb-10 text-center'
                >
                  <img class='lg:w-4/6 mx-auto mb-10 shadow-md' src={article.cover || ''} />
                  <h1 class='text-xl lg:text-2xl mb-3 font-semibold text-medium dark:text-darkdefault'>
                    {article.title}
                  </h1>
                  <span class='text-md'>{article.subtitle}</span>
                  <div class='text-xs mt-3'>
                    By
                    <For each={article.authors}>
                      {(a: Partial<User>) => <a href={`/author/${a.slug}`}>{a.username}</a>}
                    </For>
                    on {new Date(article.createdAt).toDateString()}
                  </div>
                </NavLink>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
