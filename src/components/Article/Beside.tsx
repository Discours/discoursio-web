// TODO: additional entities list column + article

import { For, Show } from 'solid-js/web'
import ArticleCard from './Card'
import AuthorCard from '../Author/Card'
import TopicCard from '../Topic/Card'
import './Beside.scss'
import { Shout, Topic, User } from '../../graphql/types.gen'

interface BesideProps {
  title: string
  values: any[]
  beside: Partial<Shout> | undefined
  wrapper: 'topic' | 'author' | 'article' | 'top-article'
}
export default (props: BesideProps) => {
  // wrap, top, title, beside, values, wrapper
  // console.debug(props.title)
  return (
    <Show when={!!props.beside?.slug && props.values?.length > 0}>
      <div class='floor floor--9'>
        <div class='wide-container row'>
          <Show when={!!props.values}>
            <div class='col-md-4'>
              <Show when={!!(props.title)}>
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
                        <ArticleCard article={value as Partial<Shout>} settings={{ noimage: true }} />
                      </Show>
                      <Show when={props.wrapper === 'top-article'}>
                        <ArticleCard
                          article={value as Partial<Shout>}
                          settings={{ noimage: true, noauthor: true }}
                        />
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
