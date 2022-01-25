<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
  import UserCard from './UserCard.svelte'
  import { authors } from '../stores/zine'

  export let beside: Shout
  export let slugs: string[]
  export let title = 'Авторы'
  export let limit = 4
</script>

<div class="floor floor--9">
  <div class="wide-container row">
    <div class="col-md-4">
      <h4>{title}</h4>
      {#each slugs.slice(0, limit) as slug}
        <UserCard user={$authors[slug]} />
      {/each}
    </div>
    <div class="col-md-8">
      <ShoutCard shout={beside} />
    </div>
  </div>
</div>
