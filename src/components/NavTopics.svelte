<script lang="ts">
	import { filterTopic } from '../stores/zine'
	import type { Topic } from '../lib/codegen'
	export let topics: Set<Topic>

	const setTopic = (slug: string) => {
		if (slug) {
			$filterTopic = slug
			window.location.hash = slug
		}
	}
</script>

<nav class="subnavigation wide-container text-2xl">
	<ul class="topics">
		{#each Array.from(topics) as t}
			<li class="item" class:selected={$filterTopic === t.slug}>
				<a
					href={'#' + t.slug}
					on:click|preventDefault={() =>
						setTopic($filterTopic === t.slug ? '' : t.slug)}
				>
					<span class:transparent={$filterTopic !== t.slug}
						>#{t.title.toLowerCase()}</span
					>
				</a>
			</li>
		{/each}
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
