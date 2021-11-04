<script lang="ts">
	import type { Topic, Shout } from '../graphql/codegen'
	import { onMount } from 'svelte'
	import { recents, topMonth, topOverall } from '../stores/zine'
	import ShoutCard from './ShoutCard.svelte'

	export let topic: Topic | Partial<Topic>

	let shouts = []

	onMount(() => {
		;[
			...Object.values($recents),
			...Object.values($topMonth),
			...Object.values($topOverall)
		].forEach(
			(s: Partial<Shout>) => s.topics.includes(topic.slug) && shouts.push(s)
		)
	})
</script>

<div class="topic">
	{#if topic}
		<div class="topic__avatar">
			<a href={topic.slug}>
				<img src={topic.pic} alt={topic.title} />
			</a>
		</div>
		<div class="topic__details">
			<div class="topic__name">
				<a href={topic.slug}>{topic.title}</a>
			</div>
			<div class="topic__about">{@html topic.body}</div>
			<div class="topic__subscribe">
				<button class="button button--subscribe">Подписаться</button>
			</div>
		</div>
		<ul class="topic-shouts">
			{#each shouts as shout}
				<ShoutCard {shout} />
			{/each}
		</ul>
	{/if}
</div>
