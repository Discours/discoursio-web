<script lang="ts">
  import type { Shout } from '$lib/codegen'
  
  import Icon from '../components/DiscoursIcon.svelte';
  import { authors } from '../stores/zine'
  import ShoutCard from './ShoutCard.svelte'
  import UserCard from './UserCard.svelte'

  export let beside: Shout
  export let slugs: string[]
  export let title = 'Авторы'
  export let limit = 4
</script>

<div class="floor">
  <div class="wide-container row">
    <div class="col-md-8">
      <ShoutCard shout={beside} />
    </div>
    <div class="col-md-4">
      <div class="ratings-header">
        <h4>{title}</h4>
        <a href="/user/list"
        >Ещё авторы
          <Icon name="arrow-right"/>
        </a>
      </div>
      {#each slugs.slice(0, limit) as slug}
        <UserCard user={$authors[slug]} />
      {/each}
    </div>
  </div>
</div>


<style lang="scss">
  .ratings-header {
		align-items: baseline;
		justify-content: space-between;
		display: flex;
		line-height: 1.1;

		:global(.icon) {
			display: inline-block;
			height: 1em;
			vertical-align: middle;
			width: 1em;
		}

		a {
			@include font-size(1.5rem);
			white-space: nowrap;
		}

		h4 {
			padding-right: 1em;
		}
	}
</style>
