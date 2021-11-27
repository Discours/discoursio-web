<script lang="ts">
	import type { Shout } from '../lib/codegen'
	import ShoutCard from './ShoutCard.svelte'
	import { filterTopic } from '../stores/zine'

	export let shouts: Shout[]
</script>

<div class="feed-shouts">
	{#each shouts as shout}
		{#if shout.topics.filter(t => t.slug === $filterTopic)}
		<ShoutCard {shout} />
		{/if}
	{/each}
</div>
