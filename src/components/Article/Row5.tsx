import { For } from "solid-js";
import ArticleCard from './Card'

export default (props) => (
<div class="floor floor--1">
  <div class="wide-container row">
    <div class="col-md-3">
      <For each={props.articles.slice(0, 2)}>
        {a => <ArticleCard article={a} /> }
        </For>
    </div>
    <div class="col-md-6">
      <ArticleCard article={props.articles[2]} />
    </div>
    <div class="col-md-3">
      <For each={props.articles.slice(3, 5)}>
        {a => <ArticleCard article={a} /> }
      </For>
    </div>
  </div>
</div>)
