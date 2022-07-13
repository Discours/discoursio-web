import { capitalize } from '../../utils'
import './Full.scss'
import MD from './MD'
import Icon from '../Nav/Icon'
import ArticleComment from './Comment'
import AuthorCard from '../Author/Card'
import { createMemo, For, Show } from 'solid-js'
import { Comment, Rating, Shout, Topic, User } from '../../graphql/types.gen'
import { useZine } from '../../context/zine'
import { useStore } from '../../context'
import { useI18n } from '@solid-primitives/i18n'
import { useAuth } from '../../context/auth'
import { Link } from 'solid-app-router'

const deepest = 6

interface ArticleProps {
  article: Partial<Shout>
  comments?: Comment[]
}

export default (props: ArticleProps) => {
  const [t] = useI18n()
  const [{ user, token, info }] = useAuth()
  const [, { follow, unfollow }] = useZine()
  const [, { showModal }] = useStore()
  const subscribed = createMemo(() => info?.userSubscribedTopics?.includes(props.article?.slug || ''))
  const mainTopic = () => (props.article?.topics?.find((topic) => topic?.slug === props.article?.mainTopic)?.title || '').replace(' ', '&nbsp;')
  const canEdit = () => !!(props.article?.authors?.find((a: Partial<User>) => a.slug === user?.slug)) // FIXME
  const getCommentLevel = (c: Comment, level = 0) => {
    if (c && c.replyTo && level < deepest) {
      level += 1
      return 0 // FIXME: getCommentLevel(commentsById[c.replyTo], level)
    }
    return level
  }
  return (
    <div class='shout wide-container'>
      <article class='col-md-6 shift-content'>
        <div class='shout__header'>
          <div class='shout__topic'>
            <a href={`/topic/${props.article.mainTopic}`} innerHTML={mainTopic() || ''}></a>
          </div>

          <h1>{props.article.title}</h1>
          <Show when={props.article.subtitle}>
            <h4>{capitalize(props.article?.subtitle as string, false)}</h4>
          </Show>

          <div class='shout__author'>
            <For each={props.article.authors}>
              {(a: Partial<User>, index) => (
                <>
                  <Show when={index() > 0}>, </Show>
                  <a href={`/author/${a.slug}`}>{a.name}</a>
                </>
              )}
            </For>
          </div>

          <div class='shout__cover' style={`background-image: url('${props.article.cover}')`} />
        </div>

        <div class='shout__body'>
          <MD body={props.article.body as string} />
        </div>
      </article>

      <div class='col-md-8 shift-content'>
        <div class='shout-stats'>
          <div class='shout-stats__item shout-stats__item--likes'>
            <Icon name='like' />
            {props.article?.ratings?.reduce((acc, curr) => acc + (curr as Rating).value, 0)}
            <Icon name='like' />
          </div>
          <div class='shout-stats__item'>
            <Icon name='view' />
            {props.article?.stat?.views}
          </div>
          <div class='shout-stats__item'>
            <a
              href='#bookmark'
              onClick={() =>
                (subscribed() ? unfollow : follow)(props.article?.slug as string, 'articles')
              }
            >
              <Icon name='bookmark' />
              <Show when={subscribed()}>{t('Bookmarked')}</Show>
              <Show when={!subscribed()}>{t('Favorite')}</Show>
            </a>
          </div>
          <div class='shout-stats__item'>
            <a href='#share' onClick={() => showModal('share')}>
              <Icon name='share' />
              {t('Share')}
            </a>
          </div>
          <Show when={canEdit()}>
            <div class='shout-stats__item'>
              <Link href='/edit'>
              <Icon name='edit' />
              {t('Edit')}
              </Link>
            </div>
          </Show>
        </div>

        <div class='topics-list'>
          <For each={props.article.topics as Topic[]}>
            {(topic: Topic) => (
              <div class='shout__topic'>
                <a href={`/topic/${topic.slug}`}>{topic.title}</a>
              </div>
            )}
          </For>
        </div>

        <div class='shout__authors-list'>
          <h4>{t('Authors')}</h4>
          <For each={props.article.authors as User[]}>
            {(user: User) => <AuthorCard author={user} compact={false} />}
          </For>
        </div>

        <Show when={props.comments?.length}>
          <h2>
            {t('Comments')} {props.comments?.length.toString() || ''}
          </h2>

          <For each={props.comments}>
            {(comment: Comment) => (
              <ArticleComment
                comment={comment}
                level={getCommentLevel(comment)}
                canEdit={comment.createdBy?.slug === user?.slug}
              />
            )}
          </For>
        </Show>

        <Show when={!token}>
          <div class='comment-warning'>
            {t('To leave a comment you please')}
            <a
              href={''}
              onClick={(evt) => {
                evt.preventDefault()
                showModal('auth')
              }}
            >
              <i>{t('sign up or sign in')}</i>
            </a>
          </div>
        </Show>

        <Show when={token}>
          <textarea class='write-comment' rows='1' placeholder={t('Write comment')} />
        </Show>
      </div>
    </div>
  )
}
