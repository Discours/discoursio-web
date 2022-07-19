import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js'
import { NavLink, useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User, Reaction } from '../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'
import '../styles/Feed.scss'
import Icon from "../components/Nav/Icon";
import { useAuth } from '../context/auth'
import { byRating, byShouts, byViews } from '../utils/sortby'
import TopicCard from "../components/Topic/Card";
import ArticleCard from "../components/Article/Card";
import { ZineState } from '../context/zine'
import MD from '../components/Article/MD'
import LoadingBar from 'solid-top-loading-bar'
import { cache, handleUpdate, loaded } from '../context/_api'
import { usePromiseQuery } from '../utils/promiseQuery'
import { useClient } from 'solid-urql'
import reactionsAll from '../graphql/q/reactions-all'

const Feed: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [auth, { info }] = useAuth()
  const [promiseQuery, ] = usePromiseQuery(useClient())
  const [mode, setMode] = createSignal(data.args?.by || 'views')
  const topTopics = createMemo(() => (data.topicslist || []).sort(byShouts).slice(0, 5))
  const articles = createMemo(() => {
    switch (mode()) {
      case 'rating':
        return Object.values(data.articles || {}).sort(byRating)
      case 'comments':
        return Object.values(data.articles || {}).sort(byRating)
      case 'views':
      default:
        return Object.values(data.articles || {}).sort(byViews)
    }
  })

  // TODO: query userCommentedShouts / info.totalUnreadComments
  // TODO: query userCollaboratedShouts / info.totalUnreadProposals
  // TODO: query userRatexpected / info.totalUnratedShouts

  const topicIsReaded = (topic: string) => {
    // TODO: topic is readed method
    return false
  }
  const authorIsReaded = (slug: string) => {
    // TODO: author is readed method
    return false
  }

  // recent comments
  const [comments ,setComments] = createSignal<Partial<Comment>[]>([])

  createEffect(() => {
    if(comments().length === 0) promiseQuery(reactionsAll, { page: 1, size: 5 })
      .then(handleUpdate)
      .then(() => setComments(cache()['reactionsAll']))
  })

  useRouteReadyState()

  return (
    <>
      <LoadingBar color='black' progress={loaded().length > 0 ? 100 : 0} />
      <div class="container feed">
        <div class="row">
          <div class="col-md-3 feed-navigation">
            <ul>
              <li><a href="#"><strong>Мои дискуссии</strong></a></li>
              <li><a href="#"><strong>Помощь сообществу</strong></a></li>
              <li><a href="#">Редактирование</a><span class="counter">7</span></li>
              <li><a href="#">Поделиться историей</a><span class="counter">18</span></li>
              <li><a href="#">Проголосовать</a><span class="counter">283</span></li>
              <li><a href="#">Подписки на форуме</a></li>
            </ul>
            <ul>
              <li>
                <a href="/feed?by=subscribed"><strong>{t('My subscriptions')}</strong></a>
              </li>
              <For each={info?.authors as Partial<User>[]}>
                {(author: Partial<User>) => (
                  <li>
                    <a
                      href={`/author/${author.slug}`}
                      classList={{ unread: authorIsReaded(author.slug as string) }}>
                      <small>@{author.slug}</small>{author.name}
                    </a>
                  </li>
                )}
              </For>

              <For each={info?.topics as string[]}>
                {(topic: string) => (
                  <li>
                    <a
                      href={`/author/${topic}`}
                      classList={{ unread: topicIsReaded(topic) }}>
                      {data.topicsBySlug[topic]?.title}
                    </a>
                  </li>
                )}
              </For>
            </ul>

            <p class="settings">
              <NavLink href="/feed/settings"><strong>{t('Feed settings')}</strong></NavLink>
              <Icon name="settings" />
            </p>
          </div>

          <div class="col-md-6">
            <ul class="feed-filter">
              <Show when={auth.authorized}>
                <li class="selected"><a href="#" onClick={() => setMode('subscribed')}>Моя лента</a></li>
              </Show>
              <li><a href="?by=views" onClick={() => setMode('views')}>Читаемое</a></li>
              <li><a href="?by=rating" onClick={() => setMode('rating')}>Одобряемое</a></li>
              <li><a href="?by=comments" onClick={() => setMode('comments')}>Обсуждаемое</a></li>
            </ul>

            <Show when={!data.feedLoading && Boolean(articles())}>
              <For each={articles() as Partial<Shout>[]}>
                {(a: Partial<Shout>) => (
                  <ArticleCard article={a} settings={{ isFeedMode: true }} />
                )}
              </For>
            </Show>
          </div>

          <aside class="col-md-3">
            <section class="feed-comments">
              <h4>{t('Comments')}</h4>
              <For each={comments() as Reaction[]}>
                {(c: Partial<Reaction>) => (
                  <div class="comment">
                    <div class="comment__content">
                      <div class="comment__text" id={"comment-" + (c?.id || '')}>
                        <MD body={c?.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt\
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\
                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\
                      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} />
                      </div>
                      <div class="comment__author-image">
                        <img src={cache()['authors'][c?.createdBy?.slug||'noname'].userpic} />
                      </div>
                    </div>
                    <div class="comment__details">
                      <a href={`@${c?.createdBy}`}>{cache()['authors'][c?.createdBy?.slug||'noname'].name || 'anonymous'}</a>
                      <div class="comment__article">
                      <Icon name="reply-arrow" />
                        <a href={`#${c?.id}`}>
                        {cache()['articles'].get(c?.replyTo)?.title || 'Lorem ipsum titled'}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </section>
            <Show when={cache()['topicsByCommunity']?.length > 0}>
              <section class="feed-topics">
                <h4>{t('Topics')}</h4>
                <For each={Array.from(topTopics()) as Partial<Topic>[]}>
                  {(value: Partial<Topic>) => (
                    <TopicCard topic={value as Topic} subscribeButtonBottom={true} />
                  )}
                </For>
              </section>
            </Show>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Feed
