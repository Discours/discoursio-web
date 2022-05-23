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
  top?: boolean
  beside: any
  wrapper: 'topic' | 'author' | 'article'
}
export default (props: BesideProps) => {
  // wrap, top, title, beside, values, wrapper
  console.log(props)
  return (
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
                  <li classList={{ top: props.top }}>
                    <Show when={props.wrapper === 'topic'}>
                      <TopicCard topic={value as Topic} compact={true} />
                    </Show>
                    <Show when={props.wrapper === 'author'}>
                      <AuthorCard author={value as Partial<User>} compact={true} />
                    </Show>
                    <Show when={props.wrapper === 'article'}>
                      <ArticleCard article={value as Partial<Shout>} settings={{ noimage: true } } />
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
  )
}
