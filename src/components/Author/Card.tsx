import { For, Show } from 'solid-js/web'
import { User } from '../../graphql/types.gen'
import Userpic from './Userpic'
import Icon from '../Nav/Icon'
import './Card.scss'
import { useStore } from '../../store'


interface AuthorCardProps {
  compact?: boolean
  canFollow?: boolean
  isFollowed?: boolean
  author: Partial<User>
}

export default (props: AuthorCardProps) => {

  const [, { follow, unfollow}] = useStore()

  // TODO: reimplement AuthorCard
  return (<>
    <Show when={!props.compact && props.author}>
      <div class="author">
          <Userpic user={props.author} />

          <div class="author__details">
            <div class="author__details-wrapper">
              <div class="author__name text-3xl text-2xl">
                <a href={`/@${props.author.slug}`}>{props.author.name}</a>
              </div>

              <Show when={props.author.bio}>
                <div class="author__about">{props.author.bio}</div>
              </Show>
            </div>

            <Show when={props.canFollow}>
              <div class="author__subscribe">
                <Show when={props.isFollowed} fallback={
                  <button onClick={follow} class="button button--subscribe">
                  <Icon name="author-subscribe" />
                  <span class="button__label">+&nbsp;Подписаться</span>
                  </button>
                }>
                  <button onClick={unfollow} class="button button--subscribe">
                    <Icon name="author-unsubscribe" />
                    <span class="button__label">-&nbsp;Отписаться</span>
                  </button>
                </Show>

                <Show when={!props.isFollowed}>
                </Show>

                <Show when={!props.compact}>
                  <button class="button button--write">
                    <Icon name="edit" />
                    Написать
                  </button>

                  <For each={props.author.links as string[]}>
                    {(link: string) => (<a href={link}>*</a>)}
                  </For>
                </Show>
              </div>
            </Show>
          </div>
      </div>
    </Show>
  </>)
}
