import { Component, createMemo, For, Show } from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User } from '../graphql/types.gen'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
// import Row1 from '../components/Article/Row1'
import Beside from '../components/Article/Beside'
import { useI18n } from '@solid-primitives/i18n'
import "./Feed.scss"
import Icon from "../components/Nav/Icon";
import { useAuth } from '../store/auth'
import { byShouts } from '../utils/by'

const Feed: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    candidates?: Partial<Shout>[]
    byTopics?: Partial<Shout>[]
    byAuthors?: Partial<Shout>[]
    byCommunities?: Partial<Shout>[]
    topics: Topic[]
    topicsBySlug: { [slug: string]: Topic }
    topicsLoading: boolean
    feedLoading: boolean
  }>()
  const [{ info }] = useAuth()
  const topicIsReaded = (topic: string) => {
    // TODO: topic is readed method
    return false
  }
  const authorIsReaded = (slug: string) => {
    // TODO: author is readed method
    return false
  }
  const articles = createMemo(() => [
    ...(data.byTopics || []),
    ...(data.byAuthors || []),
    ...(data.byCommunities || [])
  ])

  useRouteReadyState()

  return (
    <>
      <div class="container">
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
              <a href="/feed/settings"><strong>Настроить ленту</strong></a>
              <Icon name="settings"/>
            </p>
          </div>

          <div class="col-md-6">
            <ul class="feed-filter">
              <li class="selected"><a href="#">Моя лента</a></li>
              <li><a href="#">Все посты</a></li>
              <li><a href="#">Популярное</a></li>
              <li><a href="#">Обсуждаемое</a></li>
              <li><a href="#">Сортировка</a></li>
            </ul>
          </div>

          <aside class="col-md-3">
            <h4>Комментарии</h4>

            <div class="comment">
              <div class="comment__content">
                <div class="comment__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div class="comment__author-image"></div>
              </div>
              <div class="comment__details">
                <a href="#">Екатерина Ильина</a>
                <div class="comment__article">
                  <Icon name="reply-arrow"/>
                  <a href="#">
                    Убийство Сэмюэля Пати и радикальный ислам в Европе
                  </a>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>

      <div class='flex flex-col'>
        <Show when={!data.feedLoading}>
          <Beside
            title={t('Top topics')}
            values={data.topics.sort(byShouts)?.slice(0, 5)}
            beside={articles()[0]}
            wrapper={'topic'}
          />
          <Row3 articles={articles().slice(1, 4)}/>
          <Row2 articles={articles().slice(4, 6)}/>
          <Row3 articles={articles().slice(10, 13)}/>
          <Row3 articles={articles().slice(13, 16)}/>
        </Show>
      </div>
    </>
  )
}

export default Feed
