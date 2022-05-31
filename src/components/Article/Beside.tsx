// TODO: additional entities list column + article

import { For, Show } from 'solid-js/web'
import ArticleCard from './Card'
import AuthorCard from '../Author/Card'
import TopicCard from '../Topic/Card'
import './Beside.scss'
import { Shout, Topic, User } from '../../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'
import { useStore } from '../../store'

interface BesideProps {
  title: string
  values: any[]
  beside: Partial<Shout>
  wrapper: 'topic' | 'author' | 'article' | 'top-article'
}
export default (props: BesideProps) => {
  // wrap, top, title, beside, values, wrapper
  console.debug(props.title)
  const [t] = useI18n()
  const [{ info }, { follow, unfollow }] = useStore()
  return (
    <Show when={!!props.beside?.slug && props.values?.length > 0}>
      <div class='floor floor--9'>
        <div class='wide-container row'>
          <Show when={!!props.values}>
            <div class='col-md-4'>
              <Show when={Boolean(props.title)}>
                <div class='beside-column-title'>
                  <h4>{props.title}</h4>
                </div>
              </Show>
              <ul class='beside-column'>
                <For each={Array.from(props.values)}>
                  {(value: Partial<Shout | User | Topic>) => (
                    <li classList={{ top: props.wrapper.startsWith('top-') }}>
                      <Show when={props.wrapper === 'topic'}>
                        <TopicCard topic={value as Topic} compact={true} />
                      </Show>
                      <Show when={props.wrapper === 'author'}>
                        <AuthorCard author={value as Partial<User>} compact={true} />
                      </Show>
                      <Show when={props.wrapper === 'article'}>
                        <ArticleCard article={value as Partial<Shout>} settings={{ noimage: true}} />
                      </Show>
                      <Show when={props.wrapper === 'top-article'}>
                        <ArticleCard article={value as Partial<Shout>} settings={{ noimage: true, isGroup: true  }} />
                        <Show
                          when={info?.userSubscribedTopics?.includes((value as Partial<Shout>).mainTopic as string)}
                          fallback={
                            <button onClick={() => follow('topic', (value as Partial<Shout>).mainTopic)} class='follow'>
                              +&nbsp;{t('Follow')}
                            </button>
                          }
                        >
                          <button onClick={() => unfollow('topic', (value as Partial<Shout>).mainTopic)} class='follow'>
                            -&nbsp;{t('Unfollow')}
                          </button>
                        </Show>
                      </Show>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </Show>
          <div class='col-md-8'>
            <ArticleCard article={props.beside} settings={{}} />
          </div>
        </div>
      </div>
    </Show>
  )
}
