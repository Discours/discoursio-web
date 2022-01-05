<script context="module" lang="ts">
	export const prerender = true

	const shoutsOnPage = 27
	const method = 'post'
	const headers = {
		accept: 'application/json',
		'Content-Type': 'application/json;charset=utf-8'
	}

	export const load = async ({ fetch }) => {
		let props = {}
		const r = await fetch('/feed/recents.json')
		if (r.ok) {
			const { recents: shouts } = await r.json()
			return { props: { shouts } }
		} else return { props: {} }
	}
</script>

<script lang="ts">
	import NavTopics from '../../components/NavTopics.svelte'
	import {
		subscribedAuthors,
		subscribedTopics,
		authors as users
	} from '../../stores/zine'
	import { fade } from 'svelte/transition'
	import ShoutCard from '../../components/ShoutCard.svelte'
	import UserCard from '../../components/UserCard.svelte'
	import type { Shout, User } from '$lib/codegen'
	import { onMount } from 'svelte'
	import { loading } from '../../stores/app'

	export let authors: User[] = []
	export let shouts: Shout[] = []

	const load = async () => {
		$loading = true
		console.log('feed: loading subscriptions')
		if ($subscribedAuthors) {
			const aq = await fetch(`/feed/authors.json`, {
				method,
				headers,
				body: JSON.stringify({ authors: $subscribedAuthors })
			})
			if (aq.ok) {
				const data = await aq.json()
				if (data.shouts) shouts = data.shouts
				if (data.authors) authors = data.authors
				console.log(data)
			}
		}
		if ($subscribedTopics) {
			$subscribedTopics.forEach(async (topic) => {
				const tq = await fetch(`/feed/by-topic.json`, {
					method,
					headers,
					body: JSON.stringify(topic)
				})
				if (tq.ok) {
					const data = await tq.json()
					if (data.authors) authors = [...data.authors, ...authors]
					if (data.shouts) shouts = [...data.shouts, ...shouts]
				}
			})
		}
		$loading = false
	}

	let navTopics
	$: if (authors && authors.length) {
		authors = authors
			.filter((a) => $subscribedAuthors.includes(a.slug))
			.sort((a, b) => a.username.charCodeAt(0) - b.username.charCodeAt(0))
		console.log('feed: authors filtered and sorted by username')
	}

	$: if ($subscribedTopics && shouts && navTopics == []) {
		shouts = shouts.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		)
		console.log('feed: shouts sorted by created timestamp')
		shouts.forEach((s) => s.topics.forEach((t) => navTopics.push(t)))
		navTopics = [...$subscribedTopics, ...navTopics]
		load()
	}

	onMount(() => {
		console.log(shouts)
	})

	const moreShouts = async () => {
		$loading = true
		console.log('feed: show more shouts')
		const p = Math.floor(shouts.length / shoutsOnPage)
		shouts = Array.from(new Set(shouts))
		const r = await fetch('/feed/recents.json?page=' + String(p + 1))
		if (r.ok) {
			const { recents: newData } = await r.json()
			shouts = Array.from(new Set([...newData, ...shouts]))
			console.debug(`feed: total ${newData.length.toString()} shouts loaded`)
			$loading = false
		}
	}
</script>

<NavTopics slugs={new Set(navTopics)} />

<div class="feed-shouts">
	{#each [...Array(9).keys()] as r}
		{#if shouts && shouts.length > 0}
			<div class="floor" transition:fade>
				<div class="wide-container row">
					{#each shouts.slice(r * 3, (r + 1) * 3) as shout}
						<div class="col-md-4" transition:fade>
							<ShoutCard {shout} />
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
	<div class="morewrap" transition:fade>
		<div class="show-more">
			<button
				class="button"
				type="button"
				on:click|preventDefault={() => moreShouts()}
				>{$loading ? 'Загружаем' : 'Показать еще'}</button
			>
		</div>
	</div>
</div>
<div class="feed-authors">
	{#key $subscribedAuthors}
		{#if $users && authors}
			{#each authors as user}
				<UserCard {user} />
			{/each}
		{/if}
	{/key}
</div>
