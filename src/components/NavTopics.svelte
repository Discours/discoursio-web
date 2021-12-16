<script lang="ts">
	import { filterTopic, topics } from '../stores/zine'
	export let slugs: Set<string>

	const getTitle = (slug: string)=> $topics[slug].title

	const setTopic = (slug: string) => {
		$filterTopic = slug || ''
		if (slug) window.location.hash = slug
	}
</script>

<nav class="subnavigation wide-container text-2xl">
	<ul class="topics">
		{#if Object.keys($topics).length > 0}
		{#each Array.from(slugs) as slug}
			<li class="item" class:selected={$filterTopic === slug}>
				<a
					href={'#' + slug}
					on:click|preventDefault={() =>
						setTopic($filterTopic === slug ? '' : slug)}
				>
					<span class:transparent={$filterTopic !== slug}
						>#{getTitle(slug)}</span
					>
				</a>
			</li>
		{/each}
		{/if}
	</ul>
</nav>

<style lang="scss">
	.subnavigation {
		margin-top: 2rem;
		margin-bottom: 9rem;

		.topics {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.item {
			margin-right: 2.4rem;

			&:last-child {
				margin-right: 0;
			}
		}

		.selected {
			color: black;
		}
	}
</style>
