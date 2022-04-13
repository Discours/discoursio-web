import { Component, Show, For } from 'solid-js'
// import { useI18n } from '@solid-primitives/i18n'
import { useRouteData, NavLink } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
// import { useAppContext } from '../AppContext'
// import { ListenNotesEpisode, YouTube, Tweet, Twitch } from 'solid-social'
import { Shout, User } from '../graphql/types.gen'
import MD from '../components/Article/MD'

// FIXME: it is a copy of BlogArticle
export const BlogTopic: Component = () => {
  // const [t] = useI18n()
  const data = useRouteData<{
    loading: boolean
    slug?: string
    authors?: Partial<Shout>[]
    articles?: Partial<Shout>[]
  }>()

  useRouteReadyState()
  // const chevron = createMemo(() => (t('global.dir', {}, 'ltr') == 'rtl' ? 'chevron-right' : 'chevron-left'))
  // const context = useAppContext()

  return (
    <div class='flex flex-col'>
      <div class='my-2 lg:my-10 pt-5 pb-10 px-3 lg:px-12 container'>
        <div class='mb-10 lg:flex justify-center'>
          <div class='space-y-10 px-4 lg:px-0'>
            <Show
              fallback={<div class='text-center p-10 m-10'>Loading articles...</div>}
              when={!data.loading}
            >

              <For each={data.articles}>
                {(a: Partial<Shout>) => (

                  <div class='container lg:px-10'>
                    <div class='text-center space-y-5'>
                      <img class='rounded-md mb-10 shadow-md' src={a.cover || ''} />
                      <h1 class='text-4xl font-semibold mt-10 text-discours-medium dark:text-discours-darkdefault'>
                        {a.title}
                      </h1>
                      <div class='text-md'>
                      Posted by{' '}
                        <For each={a.authors}>
                          {(author: Partial<User>) => (
                            <a target='_blank' rel='noopener' href={author.slug}>
                              {author.username}
                            </a>
                          )}
                        </For>
                      on {new Date(a.createdAt).toDateString()}
                      </div>
                    </div>
                    <hr class='mt-10 w-3/6 mx-auto' />
                    <article class='my-10 prose dark:prose-invert mx-auto'>
                      <MD body={a.body || ''} />
                    </article>
                    <hr class='mt-10 w-3/6 mx-auto' />
                    <div class='flex flex-row justify-center mt-10'>
                      <NavLink href='/blog'>
                        <figure class={`inline-block chevron`} /> Back
                      </NavLink>
                    </div>
                  </div>

                )}
              </For>
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTopic
