import { For, Show } from 'solid-js/web'
import { Shout } from '../../graphql/types.gen'
import ArticleCard from './Card'
// import FloorHeader from "../Topic/FloorHeader";

export default (props: { articles: Partial<Shout>[] }) => (
  <div class='floor floor--important floor--group'>
    <div class='wide-container row'>
      <div class='group__header col-12'>
        <div class='row'>{/*<FloorHeader topic={props.articles[0]}/>*/}</div>
      </div>

      <div class='col-lg-6'>
        <ArticleCard article={props.articles[0]} settings={{ nosubtitle: false, noicon: true }} />
      </div>

      <div class='col-lg-6'>
        <Show when={props.articles}>
          <div class='row'>
            <Show when={props.articles.length < 4}>
              <For each={props.articles}>
                {(a) => (
                  <div class='row'>
                    <div class='col-md-8'>
                      <ArticleCard article={a} settings={{ nosubtitle: false, noicon: true }} />
                    </div>
                  </div>
                )}
              </For>
            </Show>
            <Show when={props.articles.length >= 4}>
              <div class='col-md-6'>
                <For each={props.articles.slice(0, 2)}>{(a) => <ArticleCard article={a} />}</For>
              </div>
              <div class='col-md-6'>
                <For each={props.articles.slice(2, 4)}>{(a) => <ArticleCard article={a} />}</For>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  </div>
)
