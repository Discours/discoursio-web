import { Component, Show, For } from 'solid-js'
// import { useI18n } from '@solid-primitives/i18n'
import { useRouteData, NavLink } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
// import { useAppContext } from '../AppContext'
// import { ListenNotesEpisode, YouTube, Tweet, Twitch } from 'solid-social'
import { Shout, User } from '../graphql/types.gen'
import MD from '../components/Article/MD'

export const BlogArticle: Component = () => {
  //const [t] = useI18n()
  const data = useRouteData<{
    loading: boolean
    slug: string
    article: Partial<Shout>
    comments?: Comment[]
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
              fallback={<div class='text-center p-10 m-10'>Loading article...</div>}
              when={!data.loading}
            >
              <div class='container lg:px-10'>
                <div class='text-center space-y-5'>
                  <img class='rounded-md mb-10 shadow-md' src={data.article.cover || ''} />
                  <h1 class='text-4xl font-semibold mt-10 text-discours-medium dark:text-discours-darkdefault'>
                    {data.article.title}
                  </h1>
                  <div class='text-md'>
                    Posted by{' '}
                    <For each={data.article.authors}>
                      {(a: Partial<User>) => (
                        <a target='_blank' rel='noopener' href={a.slug}>
                          {a.username}
                        </a>
                      )}
                    </For>{' '}
                    on {new Date(data.article.createdAt || 0).toDateString()}
                  </div>
                </div>
                <hr class='mt-10 w-3/6 mx-auto' />
                <article class='my-10 prose dark:prose-invert mx-auto'>
                  <MD body={data.article.body || ''} />
                </article>
                <hr class='mt-10 w-3/6 mx-auto' />
                <div class='flex flex-row justify-center mt-10'>
                  <NavLink href='/blog'>
                    <figure class={`inline-block`} /> Back
                  </NavLink>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogArticle
