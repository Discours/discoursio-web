import type { User } from '~/lib/graphql/types.gen'

import AuthorCard from '~/components/Author/Card'
import { For } from 'solid-js'
export let authors: User[]
export default () => (
  <div class='container'>
    <div class='row'>
      <div class='col-md-9'>Страница авторов находится в разработке</div>
      <For each={authors}>{(a) => <AuthorCard author={a} settings={{}} />}</For>
    </div>
  </div>
)
