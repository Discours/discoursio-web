import {Component, Show, For, createMemo, createSignal} from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData, NavLink } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
// import { useAppContext } from '../AppContext'
// import { ListenNotesEpisode, YouTube, Tweet, Twitch } from 'solid-social'
import {Comment, Shout, Topic, User} from '../graphql/types.gen'
import { capitalize } from '../utils'
import MD from '../components/Article/MD'
import Icon from '../components/Nav/Icon'
import AuthorCard from '../components/Author/Card'
import {useStore} from '../store';
import ArticleComment from "../components/Article/Comment";

export const BlogArticle: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    loading: boolean
    slug: string
    article: Partial<Shout>
    comments?: Comment[]
  }>()

  useRouteReadyState()
  // const chevron = createMemo(() => (t('global.dir', {}, 'ltr') == 'rtl' ? 'chevron-right' : 'chevron-left'))
  // const context = useAppContext()
  const subscribe = () => {

  };
  const unsubscribe = () => {

  };

  const [{ topicsSubscribed, currentUser, token }, {openModal}] = useStore();
  const subscribed = topicsSubscribed.includes(data.article.getShoutBySlug.slug || '')

  const deepest = 6
  const getCommentLevel = (c: Comment, level = 0) => {
    if (c && c.replyTo && level < deepest) {
      level += 1

      return 0 // FIXME: getCommentLevel(commentsById[c.replyTo], level)
    }

    return level
  }

  return (
    <div class="shout">
      <Show
        fallback={<div class='text-center p-10 m-10'>{t('Loading')}</div>}
        when={!data.loading && Boolean(data.article.getShoutBySlug)}
      >
        <div class="shout wide-container">
          <div class="row">
            <article class="col-md-6 offset-md-3">
              <div class="shout__header">
                <div class="shout__topic">
                  <a href={`/topic/${data.article.getShoutBySlug.slug}`}
                     textContent={data.article.getShoutBySlug.title.replace(' ', '&nbsp;')}></a>
                </div>

                <h1>{data.article.getShoutBySlug.title}</h1>
                <Show when={data.article.getShoutBySlug.subtitle}>
                  <h4>{capitalize(data.article.getShoutBySlug.subtitle, false)}</h4>
                </Show>

                <div class="shout__author">
                  <For each={data.article.getShoutBySlug.authors}>
                    {(a: Partial<User>, index) => (
                      <>
                        <Show when={index > 0}>, </Show>
                        <a href={`/@${a.slug}`}>{a.name}</a>
                      </>
                    )}
                  </For>
                </div>

                <div
                  class="shout__cover"
                  style={`background-image: url('${data.article.getShoutBySlug.cover}')`}
                />
              </div>

              <div class="shout__body">
                <MD body={data.article.getShoutBySlug.body} />
              </div>
            </article>
          </div>

          <div class="col-md-8 offset-md-2">
            <div class="shout-stats">
              <div class="shout-stats__item shout-stats__item--likes">
                <Icon name="like" />
                {data.article.getShoutBySlug.ratings.reduce((acc, curr) => acc + curr.value, 0)}
                <Icon name="like" />
              </div>
              <div class="shout-stats__item">
                <Icon name="view" />
                {data.article.getShoutBySlug.stat.views}
              </div>
              <div class="shout-stats__item">
                <a
                  href="#bookmark"
                  onClick={() => subscribe(data.article.getShoutBySlug.slug, 'shouts')}
                >
                  <Icon name="bookmark" />
                  <Show when={subscribed}>Сохранено</Show>
                  <Show when={!subscribed}>В&nbsp;избранное</Show>
                </a>
              </div>
              <div class="shout-stats__item">
                <a href="#share" onClick={() => (openModal('share'))}>
                  <Icon name="share" />
                  Поделиться
                </a>
              </div>
            </div>

            <div class="topics-list">
              <For each={data.article.getShoutBySlug.topics as Topic[]}>
                {(topic: Topic) => (
                  <div class='shout__topic'>
                    <a href={`/topic/${topic.slug}`}>{topic.title}</a>
                  </div>
                )}
              </For>
            </div>

            <div class="shout__authors-list">
              <h4>Авторы</h4>
              <For each={data.article.getShoutBySlug.authors as User[]}>
                {(user: User) => (
                  <AuthorCard author={user} compact={true} canFollow={false} />
                )}
              </For>
            </div>

            <h2>Комментарии {data.article.getShoutBySlug.comments.length}</h2>

            <For each={data.article.getShoutBySlug.comments}>
              {(comment: Comment) => (
                <ArticleComment
                  comment={comment}
                  level={getCommentLevel(comment)}
                  canEdit={comment.author.slug === currentUser.slug}
                />
              )}
            </For>

            <Show when={!token}>
              <div class="comment-warning">
                Чтобы оставить комментарий, необходимо
                <a href={''} onClick={(evt) => {
                  evt.preventDefault();
                  openModal('auth');
                }}><i>зарегистрироваться или войти</i></a>
              </div>
            </Show>

            <Show when={token}>
              <textarea
                class="write-comment"
                rows="1"
                placeholder="Написать комментарий"
              />
            </Show>
          </div>
        </div>
      </Show>
    </div>


/*
    <div class="topic-full container">
      <div class="row">
        <div class="topic__header col-md-8 offset-md-2">
          <Show
            fallback={<div class='text-center p-10 m-10'>{t('Loading')}</div>}
            when={!data.loading && Boolean(data.article.getShoutBySlug)}
          >
            <h1>{data.article.getShoutBySlug?.title || ''}</h1>
            <>{data.article.getShoutBySlug.body}</>
            <div class="topic__actions">
              <Show when={subscribed}>
                <button
                  onClick={async () =>
                    (subscribed = await unsubscribe(data.slug, 'topics'))}
                  class="button">Отписаться от темы</button
                >
              </Show>
              <Show when={!subscribed}>
                <button
                  onClick={async () =>
                    (subscribed = await subscribe(data.slug, 'topics'))}
                  class="button">Подписаться на тему</button
                >
              </Show>
              <a href={'/create/' + data.slug}>Написать в тему</a>
            </div>
            <Show when={data.article.getShoutBySlug.cover}>
              <img src={data.article.getShoutBySlug.cover} alt={data.article.getShoutBySlug.title}/>
            </Show>
          </Show>
        </div>
      </div>
    </div>
*/


/*
    <div class='flex flex-col'>
      <div class='my-2 lg:my-10 pt-5 pb-10 px-3 lg:px-12 container'>
        <div class='mb-10 lg:flex justify-center'>
          <div class='space-y-10 px-4 lg:px-0'>
            {JSON.stringify(data)}

            <Show
              fallback={<div class='text-center p-10 m-10'>{t('Loading')}</div>}
              when={!data.loading && Boolean(data.article)}
            >
              <div class='container lg:px-10'>
                <div class='text-center space-y-5'>
                  <img class='rounded-md mb-10 shadow-md' src={data.article?.cover || ''} />
                  <h1 class='text-4xl font-semibold mt-10 text-discours-medium dark:text-discours-darkdefault'>
                    {data.article?.title || ''}
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
*/
  )
}

export default BlogArticle
