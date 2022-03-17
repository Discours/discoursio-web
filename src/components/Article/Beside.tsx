// TODO: additional entities list column + article

import { For, Show } from 'solid-js/web'
import { Shout as Article } from '~/lib/graphql/types.gen'
import ArticleCard from './Card'
import AuthorCard from '../Author/Card'
import TopicCard from '../Topic/Card'
import './Beside.scss'

const cards = {
  topic: TopicCard,
  author: AuthorCard,
  article: ArticleCard
}

export default (props) => {
  // wrap, top, title, beside, values
  return (
    <div class='floor floor--9'>
      <div class='wide-container row'>
        <div class='col-md-4'>
          <Show when={Boolean(props.title)}>
            <div class='beside-column-title'>
              <h4>{props.title}</h4>
            </div>
          </Show>
          <ul class='beside-column'>
            <For each={props.values.slice(1, props.values.length - 1)}>
              {(article: Partial<Article>) => {
                return (
                  <li classList={{ top: props.top }}>
                    <div class='beside-column__topic'>
                      <a href={`/topic/${article.mainTopic}`}>
                        {article.topics.find((item) => item.slug === article.mainTopic).title}
                      </a>
                    </div>
                    <div class='beside-column__shout'>
                      <a href={`/${article.slug}`}>
                        <h4>{article.title}</h4>
                        <Show when={article.subtitle}>{article.subtitle}</Show>
                      </a>
                    </div>
                  </li>
                )
              }}
            </For>
          </ul>
        </div>
        <div class='col-md-8'>
          <ArticleCard article={props.beside} settings={{}} />
        </div>
      </div>
    </div>
  )
}
