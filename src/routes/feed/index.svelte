<script context="module" lang="ts">
	export const prerender = true

	const shoutsOnPage = 27
	const method = 'post'
	const headers = {
		accept: 'application/json',
		'Content-Type': 'application/json;charset=utf-8'
	}

	export const load = async ({ fetch }) => {
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
	import { loading } from '../../stores/app'
	import { onMount } from 'svelte'

	export let authors: User[] | null = []
	export let shouts: Shout[]

	$: if ($subscribedAuthors && authors === null) (async () => {
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
		})()

	$: if($subscribedAuthors && authors) authors = authors.filter((a) => $subscribedAuthors.includes(a.slug))

	$: if ($subscribedTopics) {
			$subscribedTopics.forEach(async (topic) => {
				const tq = await fetch(`/feed/by-topic.json`, {
					method,
					headers,
					body: await JSON.stringify(topic)
				})
				if (tq.ok) {
					const data = await tq.json()
					if (data.authors) authors = [...data.authors, ...authors]
					if (data.shouts) shouts = [...data.shouts, ...shouts]
				}
			})
		}

	onMount(() => {
		if(!shouts) authors = null // triggs update
		else shouts.forEach(s => s.authors.forEach(a => authors.push(a)))
	})

	const moreShouts = async () => {
		$loading = true
		console.log('feed: show more shouts')
		const p = Math.floor(shouts.length / shoutsOnPage)
		shouts = Array.from(new Set(shouts))
		const r = await fetch('/feed/recents.json?page=' + String(p + 1))
		if (r.ok) {
			const { recents: update } = await r.json()
			shouts = Array.from(new Set([...update, ...shouts]))
			console.debug(`feed: total ${update.length.toString()} shouts loaded`)
			$loading = false
		}
	}
</script>

<section class='feed' transition:fade>
	{#if shouts} <NavTopics {shouts} />{/if}

	<div class="feed-shouts">
		{#each [...Array(9).keys()] as r}
			{#if shouts && shouts.length > 0}
				<div class="floor" transition:fade>
					<div class="wide-container row">
						{#each shouts.slice(r * 3, (r + 1) * 3) as shout}
							<div class="col-md-4" >
								<ShoutCard {shout} />
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
		<div class="morewrap">
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
	<div class="feed-authors" transition:fade>
		{#key $subscribedAuthors}
			{#if $users && authors}
				{#each authors as user}
					<UserCard {user} />
				{/each}
			{/if}
		{/key}
	</div>
</section>