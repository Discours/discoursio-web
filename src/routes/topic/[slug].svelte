<script context="module" lang="ts">
	export const prerender = true

	export const load = async ({ page, fetch }) => {
		const { slug } = page.params
		let props = { slug }
		const q = await fetch(`/topic/${slug}.json`)
		if (q.ok) {
			const data = await q.json()
			props = { ...data, ...props }
		}
		return { props }
	}
</script>

<script lang="ts">
	import { topics } from '../../stores/zine'
	import TopicFull from '../../components/TopicFull.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import ShoutCard from '../../components/ShoutCard.svelte'
	import UserCard from '../../components/UserCard.svelte'

	export let shouts
	export let authors
	export let slug

	let topic

	$: if(!slug && $page && $page.params.slug) {
		slug = $page.params.slug
	}

	$: if (Object.keys($topics).length > 0 && !topic)
		topic = $topics[slug]
	onMount(() => (topic = null))
</script>

<svelte:head><title>Дискурс : {$page.params.slug}</title></svelte:head>
{#if topic}
	<h3>Тема: {topic.title}</h3>
	<TopicFull {topic} />
{/if}
<div class="topic-shouts">
	{#each shouts as shout}
	<ShoutCard {shout} />
	{/each}
</div>
<div class="topic-authors">
	{#each authors as author}
	<UserCard user={author} />
	{/each}
</div>
