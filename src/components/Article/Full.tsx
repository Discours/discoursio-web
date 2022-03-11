import { capitalize } from '~/lib/utils'
import './Full.scss'
import MD from './MD'
import Icon from '../Nav/Icon'
import ArticleComment from './Comment'
import AuthorCard from '../Author/Card'
import { For, Show, createSignal, onMount } from 'solid-js'
import { Comment, Topic } from '~/lib/graphql/types.gen'
import { useStore } from '~/store'

function subscribe(slug: string, arg1: string) {
  throw new Error('Function not implemented.')
}

const deepest = 6
let commentElement
const getCommentLevel = (c, level = 0) => {
  if (c && c.replyTo && level < deepest) {
    level += 1

    return 0 // FIXME: getCommentLevel(commentsById[c.replyTo], level)
  }

  return level
}
let article
const token = ''
let mainTopic: Topic
let canEdit = false
const subscribedArticles = []
let session

export default (props) => {
  const [modal, setModal] = createSignal('')
  const store = useStore()
  const { currentUser } = store[0]

  onMount(async () => {
    mainTopic = props.article.topics.find((item) => item.slug === props.article.mainTopic)
    canEdit = Boolean(props.article.authors.find((a) => a.slug === session.slug)) // FIXME
  })

  return (
    <div class='article'>
      <div class='article wide-container'>
        <div class='row'>
          <article class='col-md-6 offset-md-3'>
            <div class='article__header'>
              <div class='article__topic'>
                <a href={`/topic/${mainTopic.slug}`}>#{mainTopic.title.replace(' ', '&nbsp;')}</a>
              </div>

              <h1>{props.article.title}</h1>
              <Show when={props.article.subtitle}>
                <h4>{capitalize(props.article.subtitle, false)}</h4>
              </Show>
              <div class='article__author'>
                <For each={props.article.authors}>
                  {([author, index]) => (
                    <>
                      <Show when={index > 0}>, </Show>
                      <a href={`/@${author.slug}`}>{author.name}</a>
                    </>
                  )}
                </For>
              </div>

              <div class='article__cover' style={`background-image: url('${props.article.cover}')`} />
            </div>

            <div class='article__body'>
              <MD body={props.article.body} />
            </div>
          </article>
        </div>

        <div class='col-md-8 offset-md-2'>
          <div class='article-stats'>
            <div class='article-stats__item article-stats__item--likes'>
              <Icon name='like' />
              {props.article.ratings.reduce((acc, curr) => acc + curr.value, 0)}
              <Icon name='like' />
            </div>
            <div class='article-stats__item'>
              <Icon name='view' />
              {props.article.stat.views}
            </div>
            <div class='article-stats__item'>
              <a href='#bookmark' onClick={() => subscribe(props.article.slug, 'articles')}>
                <Icon name='bookmark' />
                <Show when={props.article.slug in subscribedArticles} fallback={`В&nbsp;избранное`}>
                  Сохранено
                </Show>
              </a>
            </div>
            <div class='article-stats__item'>
              <a href='#share' onClick={() => setModal('share')}>
                <Icon name='share' />
                Поделиться
              </a>
            </div>
          </div>

          <div class='topics-list'>
            <For each={props.article.topics}>
              {(topic: Topic) => (
                <div class='article__topic'>
                  <a href={`/topic/${topic.slug}`}>{topic.title}</a>
                </div>
              )}
            </For>
          </div>

          <div class='article__authors-list'>
            <h4>Авторы</h4>

            <For each={props.article.authors}>
              {([author, index]) => (
                <>
                  <Show when={index > 0}>, </Show>
                  <AuthorCard {...author} hasSubscribeButton={false} />
                </>
              )}
            </For>
          </div>

          <h2>Комментарии {props.article.comments.length}</h2>

          <For each={props.article.comments}>
            {(comment: Comment) => (
              <ArticleComment
                comment={comment}
                level={getCommentLevel(comment)}
                canEdit={comment.author.slug === currentUser.slug}
              />
            )}
          </For>
          <Show
            when={token}
            fallback={() => (
              <div class='comment-warning'>
                Чтобы оставить комментарий, необходимо
                <a href={''} onClick={() => setModal('auth')}>
                  <i>зарегистрироваться или войти</i>
                </a>
              </div>
            )}
          >
            <textarea
              class='write-comment'
              rows='1'
              placeholder='Написать комментарий'
              ref={commentElement}
            />
          </Show>
        </div>
      </div>
    </div>
  )
}
