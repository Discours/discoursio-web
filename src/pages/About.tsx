import { Component, Show, PropsWithChildren } from 'solid-js'
// import { useI18n } from '@solid-primitives/i18n';
import { useRouteData, NavLink } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { useAppContext } from '../AppContext'
import { ListenNotesEpisode, YouTube, Tweet, Twitch } from 'solid-social'

export const AboutArticle: Component = () => {
  // const [t] = useI18n();
  const data = useRouteData<{
    loading: boolean
    slug: string
    details: BlogInfo
    archive: boolean
    article: MDXComponent
  }>()

  useRouteReadyState()
  const context = useAppContext()

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
                  <img class='rounded-md mb-10 shadow-md' src={data.details.img} />
                  <h1 class='text-4xl font-semibold mt-10 text-discours-medium dark:text-discours-darkdefault'>
                    {data.details.title}
                  </h1>
                  <div class='text-md'>
                    Posted by{' '}
                    <a target='_blank' rel='noopener' href={data.details.author_url}>
                      {data.details.author}
                    </a>{' '}
                    on {new Date(data.details.date).toDateString()}
                  </div>
                </div>
                <hr class='mt-10 w-3/6 mx-auto' />
                <article class='my-10 prose dark:prose-invert mx-auto'>
                  <data.article
                    components={{
                      ListenNotesEpisode,
                      Tweet: (props: PropsWithChildren) => (
                        <Tweet {...props} theme={context.isDark ? 'dark' : 'light'}>
                          {props.children}
                        </Tweet>
                      ),
                      YouTube,
                      Twitch
                    }}
                  />
                </article>
                <hr class='mt-10 w-3/6 mx-auto' />
                <div class='flex flex-row justify-center mt-10'>
                  <NavLink href='/blog'>
                    <figure class={`inline-block chevron`} /> Back
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

export default AboutArticle