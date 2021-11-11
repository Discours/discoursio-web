<script lang="ts">
	import { shoutslist, filterTopic, topics, topicslist } from '../stores/zine'

	const setTopic = (slug: string) => ($filterTopic = slug)

	$: if ($shoutslist && $shoutslist.length > 0) {
		let ttt = new Set([])
		$shoutslist.forEach((s) => s.topics.forEach((t) => ttt.add(t)))
		$topicslist = Array.from(ttt)
	}
</script>

<nav class="subnavigation wide-container text-2xl">
	<ul class="topics">
		{#each $topicslist as t}
			<li class="item" class:selected={$filterTopic === t.slug}>
				<a
					href={'#' + t.slug}
					on:click={() => setTopic($filterTopic === t.slug ? '' : t.slug)}
				>
					<span class:transparent={$filterTopic !== t.slug}>#</span>
					{t.title.toLowerCase()}
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
