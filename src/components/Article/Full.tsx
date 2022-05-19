import { capitalize } from '../../utils'
import './Full.scss'
import MD from './MD'
import Icon from '../Nav/Icon'
import ArticleComment from './Comment'
import AuthorCard from '../Author/Card'
import { createEffect, createSignal, For, Show } from 'solid-js'
import { Comment, Maybe, Shout, Topic, User } from '../../graphql/types.gen'
import { useStore } from '../../store'
import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'

const deepest = 6

interface ArticleProps {
  article: Partial<Shout>
  comments?: Comment[]
}

export default (props: ArticleProps) => {
  const [t] = useI18n()
  const [{ currentUser, token }, { showModal, follow, unfollow }] = useStore()
  const [isFollowed, setFollowed] = createSignal(false)

  createEffect(() => {
    if(props.article?.authors?.find(a => a.slug === currentUser.slug)) setFollowed(true)
  })

  let commentElement
  const getCommentLevel = (c: Comment, level = 0) => {
    if (c && c.replyTo && level < deepest) {
      level += 1

      return 0 // FIXME: getCommentLevel(commentsById[c.replyTo], level)
    }

    return level
  }

  const mainTopic = () =>
    props.article?.topics?.find((item: Maybe<Topic>) => Boolean(item?.slug === props.article?.mainTopic))
  //const canEdit = () =>
  //  Boolean(props.article?.authors?.find((a: Partial<User>) => a.slug === currentUser.slug)) // FIXME

  return (
    <div class='article'>
      <div class='article wide-container'>
        <div class='row'>
          <article class='col-md-6 offset-md-3'>
            <div class='article__header'>
              <div class='article__topic'>
                <NavLink href={`/topic/${mainTopic()?.slug}`}>#{mainTopic()?.title?.replace(' ', '&nbsp;')}</NavLink>
              </div>

              <h1>{props.article.title}</h1>
              <Show when={props.article.subtitle}>
                <h4>{capitalize(props.article?.subtitle || '', false)}</h4>
              </Show>
              <div class='article__author'>
                <For each={props.article.authors}>
                  {(u) => (
                    <>
                      <Show when={Boolean(u) && (props.article.authors as Partial<User>[]).indexOf(u) > 0}>
                        ,{' '}
                      </Show>
                      <NavLink href={`/author/${u.slug}`}>{u.name}</NavLink>
                    </>
                  )}
                </For>
              </div>

              <div class='article__cover' style={`background-image: url('${props.article.cover}')`} />
            </div>

            <div class='article__body'>
              <MD body={props.article.body || ''} />
            </div>
          </article>
        </div>

        <div class='col-md-8 offset-md-2'>
          <div class='article-stats'>
            <div class='article-stats__item article-stats__item--likes'>
              <Icon name='like' />
              {props.article?.ratings?.reduce((acc, curr) => acc + (curr?.value || 0), 0)}
              <Icon name='like' />
            </div>
            <div class='article-stats__item'>
              <Icon name='view' />
              {props.article?.stat?.views}
            </div>
            <div class='article-stats__item'>
              <a onClick={() => (isFollowed() ? unfollow : follow)(props.article?.slug || '', 'articles')}>
                <Icon name='bookmark' />
                <Show when={isFollowed()} fallback={t('Favorite')}>
                  {t('Bookmarked')}``
                </Show>
              </a>
            </div>
            <div class='article-stats__item'>
              <a onClick={() => showModal('share')}>
                <Icon name='share' />
                {t('Share')}
              </a>
            </div>
          </div>

          <div class='topics-list'>
            <For each={props.article.topics as Topic[]}>
              {(topic: Topic) => (
                <div class='article__topic'>
                  <NavLink href={`/topic/${topic.slug}`}>{topic.title}</NavLink>
                </div>
              )}
            </For>
          </div>

          <div class='article__authors-list'>
            <h4>{t('Authors')}</h4>

            <For each={props.article.authors}>
              {(author: Partial<User>) => (
                <>
                  <Show when={props.article?.authors?.includes(author as User)}>, </Show>
                  <AuthorCard author={author} canFollow={false}/>
                </>
              )}
            </For>
          </div>

          <h2>
            {t('Comments')} {props.comments?.length}
          </h2>

          <For each={props.comments}>
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
                {t('To leave a comment please')}
                <a onClick={() => showModal('auth')}>
                  <i>{t('sign up or sign in')}</i>
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
