import { Component, createMemo, createSignal, For, Show } from 'solid-js'
import { NavLink, useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User, Comment } from '../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'
import './Feed.scss'
import Icon from "../components/Nav/Icon";
import { useAuth } from '../store/auth'
import { byRating, byShouts, byViews } from '../utils/sortby'
import TopicCard from "../components/Topic/Card";
import ArticleCard from "../components/Article/Card";
import { ZineState } from '../store/zine'
import MD from '../components/Article/MD'

const Feed: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [auth, { info }] = useAuth()
  const [mode, setMode] = createSignal(data.args?.by || 'views')
  const topTopics = createMemo(() => (data.topicslist||[]).sort(byShouts).slice(0, 5))
  const articles = createMemo(() => {
    switch(mode()){
      case 'rating':
        return Object.values(data.articles||{}).sort(byRating)
      case 'comments':
        return Object.values(data.articles||{}).sort(byRating)
      case 'views':
      default:
        return Object.values(data.articles||{}).sort(byViews)
    }
  })

  const topicIsReaded = (topic: string) => {
    // TODO: topic is readed method
    return false
  }
  const authorIsReaded = (slug: string) => {
    // TODO: author is readed method
    return false
  }

  useRouteReadyState()

  return (
    <>
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
              <li><a href="#"><strong>Мои подписки</strong></a></li>
              <For each={info?.userSubscribedAuthors as Partial<User>[]}>
                {(author: Partial<User>) => (
                  <li>
                    <a
                      href={`/author/${author.slug}`}
                      classList={{ unread: authorIsReaded(author.slug as string) }}>
                      {author.name}
                    </a>
                  </li>
                )}
              </For>
              <li><a href="#">Eto_ya sam</a></li>
              <li><a href="#" class="unread">Технопарк sam</a></li>
              <li><a href="#" class="unread">Надежда Фролова</a></li>

              <For each={info?.userSubscribedTopics as string[]}>
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
              <li><a href="#">#Лучшее</a></li>
              <li><a href="#">#Реклама</a></li>
              <li><a href="#" class="unread">#Искусство</a></li>
              <li><a href="#" class="unread"><strong>#Общество</strong></a></li>
              <li><a href="#">#Личный опыт</a></li>
              <li><a href="#">#Наука</a></li>
              <li><a href="#">#Философия</a></li>
              <li><a href="#">#Интервью</a></li>
              <li><a href="#">#Нетленки</a></li>
            </ul>

            <p class="settings">
              <NavLink href="/feed/settings"><strong>{t('Feed settings')}</strong></NavLink>
              <Icon name="settings"/>
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
                  <ArticleCard article={a} settings={{isFeedMode: true}} />
                )}
              </For>
            </Show>
          </div>

          <aside class="col-md-3">
            <h4>{t('Comments')}</h4>
            <Show when={data['commentsAll']?.length > 0}>
              <section class="comments">
              <For each={data['commentsAll']}>
                {(c: Partial<Comment>) => (
                  <div class="comment">
                    <div class="comment__content">
                      <div class="comment__text">
                        <MD body={c.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt\
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} />
                      </div>
                      <div class="comment__author-image" />
                    </div>
                    <div class="comment__details">
                      <a href={'@' + c.createdBy}>{(data.authors||{})[c.createdBy?.slug || ''].name || 'anonymous'}</a>
                      <div class="comment__article">
                        <Icon name="reply-arrow"/>
                        <a href="#">
                          Убийство Сэмюэля Пати и радикальный ислам в Европе
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </For>
              </section>
            </Show>

            <For each={Array.from(topTopics()) as Partial<Topic>[]}>
              {(value: Partial<Shout | User | Topic>) => (
              <TopicCard topic={value as Topic} subscribeButtonBottom={true} />
              )}
            </For>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Feed
