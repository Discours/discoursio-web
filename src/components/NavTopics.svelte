<script lang="ts">
	import { filterTopic } from '../stores/zine'
	import { page } from "$app/stores"
	import { topics as topicsStore } from '../stores/zine'
	import type { Topic } from '../lib/codegen'

	export let topics: Topic[] = []
	export let slugs: string[] = []

	$: if($page && topics.length === 0 && slugs.length > 0) {
		const community = $page.host ? $page.host.split('.')[0] : 'discours'
		fetch(`/topic/community.json?slug=${community}`)
			.then(data => data.json())
			.then(({ topics: ttt }) => $topicsStore = { ...$topicsStore, ...ttt })
	}

	const setTopic = (slug: string) => ($filterTopic = slug)

	const onHashRoute = (ev) => {
		console.log(ev)
	}
</script>
<svelte:window on:hashchange={onHashRoute} />
<nav class="subnavigation wide-container text-2xl">
	<ul class="topics">
		{#each topics as t}
			<li class="item" class:selected={$filterTopic === t.slug}>
				<a href={'#' + t.slug} on:click={() => setTopic($filterTopic === t.slug ? '' : t.slug)}>
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
