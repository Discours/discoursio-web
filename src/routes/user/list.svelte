<script lang="ts">
  import type { User } from '$lib/codegen'

  import UserCard from '$lib/components/UserCard.svelte'
  export let authors: User[]

  // TODO: authors page
</script>

<div class="container">
  <div class="row">
    <div class="col-md-9">Страница авторов находится в разработке</div>
    {#each authors as user}<UserCard {user} />{/each}
  </div>
</div>
