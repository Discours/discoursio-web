import { For } from "solid-js";
import ArticleCard from './Card'

export default (props) => (
<div class="floor floor--7">
  <div class="wide-container row">
    <h2 class="col-12">Коротко</h2>
    <For each={props.articles}>
      {a =>
      <div class="col-md-6 col-lg-3">
        <ArticleCard article={a} settings={{ additionalClass: "shout-card--with-cover shout-card--content-top" }} />
      </div>
      }
    </For>
  </div>
</div>
)