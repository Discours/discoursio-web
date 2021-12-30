<script context="module" lang="ts">
	export const prerender = true

	const method = 'post'
	const headers = { 'Content-Type': 'application/json;charset=utf-8' }
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
	import { onMount } from 'svelte/internal'
	import UserCard from '../../components/UserCard.svelte'
	import type { Shout, User } from '$lib/codegen'

	export let shouts: Shout[] = []
	export let authors: User[] = []

	const load = async () => {
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
	}

	let navTopics

	$: if (shouts && shouts.length) {
		shouts = shouts.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		)
		console.log('feed: shouts sorted by created timestamp')
	}

	$: if (authors && authors.length) {
		authors = authors
			.filter((a) => $subscribedAuthors.includes(a.slug))
			.sort((a, b) => a.username.charCodeAt(0) - b.username.charCodeAt(0))
		console.log('feed: authors filtered and sorted by username')
	}

	$: if ($subscribedTopics && shouts && navTopics == []) {
		shouts.forEach((s) => s.topics.forEach((t) => navTopics.push(t)))
		navTopics = [...$subscribedTopics, ...navTopics]
		load()
	}

	onMount(async () => {
		shouts = null
		authors = null
		navTopics = []
	})
</script>

<NavTopics slugs={new Set(navTopics)} />

<div class="feed-authors">
	{#key $subscribedAuthors}
		{#if $users && authors}
			{#each authors as user}
				<UserCard {user} subscribed={$subscribedAuthors.includes(user.slug)} />
			{/each}
		{/if}
	{/key}
</div>
<div class="feed-shouts">
	{#key shouts}
		{#each [...Array(9).keys()] as r}
			{#if shouts}
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
	{/key}
</div>
