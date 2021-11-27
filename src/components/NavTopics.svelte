<script lang="ts">
	import { filterTopic, topics } from '../stores/zine'
	export let slugs: string[] = []

	const setTopic = (slug: string) => {
		if (slug) {
			$filterTopic = slug
			window.location.hash = slug
		}
	}
</script>

<nav class="subnavigation wide-container text-2xl">
	<ul class="topics">
		{#if $topics}
			{#each Object.values($topics) as t}
				{#if t.slug in slugs}
					<li class="item" class:selected={$filterTopic === t.slug}>
						<a
							href={'#' + t.slug}
							on:click|preventDefault={() =>
								setTopic($filterTopic === t.slug ? '' : t.slug)}
						>
							<span class:transparent={$filterTopic !== t.slug}>#</span>
							{t.title.toLowerCase()}
						</a>
					</li>
				{/if}
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
