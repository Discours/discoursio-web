<script lang="ts">
	import { filterTopic, topics } from '../stores/zine'
	export let slugs: Set<string>
	const getTitle = (slug: string) => $topics[slug].title
</script>

<nav class="subnavigation wide-container text-2xl">
	<ul class="topics">
		{#if Object.keys($topics).length > 0}
			{#each Array.from(slugs) as slug}
				<li class="item" class:selected={$filterTopic === slug}>
					<a href={'/topic/' + slug} on:click={() => ($filterTopic = slug || '')}>
						<span class:transparent={$filterTopic !== slug}>#{getTitle(slug)}</span>
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</nav>

<style lang="scss">
	.subnavigation {
		@include font-size(1.5rem);
		margin-bottom: 2.4rem;

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

		a {
			color: #141414;
		}
		a:hover {
			font-weight: 500;
		}
	}
</style>
