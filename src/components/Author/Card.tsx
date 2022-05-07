import { Show } from 'solid-js/web'
import {Topic, User} from '../../graphql/types.gen'
import Userpic from './Userpic'
import Icon from '../Nav/Icon'
import './Card.scss'


interface AuthorCardProps {
  compact?: boolean
  canFollow?: boolean
  isFollowed?: boolean
  author: Partial<User>
}

const link2title = {
  instagram: 'ig',
  facebook: 'fb',
  linkedin: 'in',
  telegram: 'tg',
  vk: 'vk'
}

const getLinkName = (l) =>
  link2title[Object.keys(link2title).filter((key) => l.includes(key))[0]] || l

export default (props: AuthorCardProps) => {

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
                <Show when={props.isFollowed}>
                  <button
                    onClick={async () =>
                      (subscribed = await unsubscribe(props.author.slug, 'authors'))}
                    class="button button--subscribe"
                    ><Icon name="author-unsubscribe" />
                    <span class="button__label">-&nbsp;Отписаться</span>
                  </button>
                </Show>

                <Show when={!props.isFollowed}>
                  <button
                    onClick={async () =>
                      (subscribed = await subscribe(props.author.slug, 'authors'))}
                    class="button button--subscribe"
                  >
                    <Icon name="author-subscribe" />
                    <span class="button__label">+&nbsp;Подписаться</span>
                  </button>
                </Show>

                <Show when={!props.compact}>
                  <button class="button button--write">
                    <Icon name="edit" />
                    Написать
                  </button>

                  <Show when={!props.author.links?.length}>
                    <For each={props.author.links}>
                      {(link) => (
                        <a href={link}>{getLinkName(link)}</a>
                      )}
                    </For>
                  </Show>
                </Show>
              </div>
            </Show>
          </div>
      </div>
    </Show>
  </>)
}
