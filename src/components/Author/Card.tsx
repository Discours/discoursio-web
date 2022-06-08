import { For, Show } from 'solid-js/web'
import { User } from '../../graphql/types.gen'
import Userpic from './Userpic'
import Icon from '../Nav/Icon'
import './Card.scss'
import { useZine } from '../../store/zine'
import { NavLink } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createMemo } from 'solid-js'
import { translit } from '../../utils/ru2en'
import { useAuth } from '../../store/auth'

interface AuthorCardProps {
  compact?: boolean
  hideFollow?: boolean
  author: Partial<User>
}

export default (props: AuthorCardProps) => {
  const [t, { locale }] = useI18n()
  const [{}, { follow, unfollow }] = useZine()
  const [{ session, info }] = useAuth()
  const subscribed = createMemo(
    () => !!info?.userSubscribedAuthors?.filter((u) => u?.slug === props.author.slug).pop()
  )
  const canFollow = createMemo(() => !props.hideFollow && session?.slug !== props.author.slug)
  const bio = createMemo(() => props.author.bio || t('Our regular contributor'))
  const name = createMemo(() => translit(props.author.name || '', locale() || 'ru'))
  // TODO: reimplement AuthorCard
  return (
    <>
      <Show when={props.author}>
        <div class='author'>
          <Userpic user={props.author} />

          <div class='author__details'>
            <div class='author__details-wrapper'>
              <div class='author__name text-3xl text-2xl'>
                <NavLink href={`/author/${props.author.slug}`}>{name()}</NavLink>
              </div>

              <div class='author__about'>{bio()}</div>
            </div>

            <Show when={canFollow()}>
              <div class='author__subscribe'>
                <Show
                  when={subscribed()}
                  fallback={
                    <button onClick={follow} class='button button--subscribe'>
                      <Icon name='author-subscribe' />
                      <span class='button__label'>+&nbsp;{t('Follow')}</span>
                    </button>
                  }
                >
                  <button onClick={unfollow} class='button button--subscribe'>
                    <Icon name='author-unsubscribe' />
                    <span class='button__label'>-&nbsp;{t('Unfollow')}</span>
                  </button>
                </Show>

                <Show when={!props.compact}>
                  <button class='button button--write'>
                    <Icon name='edit' />
                    {t('Write')}
                  </button>

                  <For each={props.author.links as string[]}>{(link: string) => <a href={link}>*</a>}</For>
                </Show>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  )
}
