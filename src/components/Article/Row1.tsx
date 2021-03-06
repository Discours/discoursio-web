import { Show } from 'solid-js'
import { Shout } from '../../graphql/types.gen'
import ArticleCard from './Card'
import './Row1.scss'

export default (props: { article: Partial<Shout> }) => (
  <Show when={!!props.article}>
    <div class='floor floor--one-article'>
      <div class='wide-container row'>
        <div class='col-12'>
          <ArticleCard article={props.article} />
        </div>
      </div>
    </div>
  </Show>
)
