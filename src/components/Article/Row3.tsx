import { For } from 'solid-js/web'
import { Shout } from '../../graphql/types.gen'
import ArticleCard from './Card'

export default (props: { articles: Partial<Shout>[] }) => {
  return (
    <div class='floor'>
      <div class='wide-container row'>
        <For each={props.articles}>
          {(a) => (
            <div class='col-md-4'>
              <ArticleCard article={a} />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
