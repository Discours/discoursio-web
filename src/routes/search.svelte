<script lang="ts">
	import { shouts } from '../stores/zine'
	import ShoutCard from '../components/ShoutCard.svelte'

	let teasers = []
	$: if ($shouts) teasers = Object.keys($shouts)

	// TODO: topAuthors query
</script>

<div class="results">
	{#await $shouts}
		Загрузка...
	{:then}
		{#each teasers as shid}
			<ShoutCard shout={$shouts[shid]} />
		{/each}
	{/await}
</div>

<style>
	.results {
		width: 100%;
		overflow-y: scroll;
	}
</style>
