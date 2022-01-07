<script context="module">
	import 'swiper/css'
	import 'swiper/css/navigation'
	export const prerender = true

	const shoutsOnPage = 27
	const method = 'post'
	const headers = {
		accept: 'application/json',
		'Content-Type': 'application/json;charset=utf-8'
	}
	export const load = async ({ fetch }) => {
		let props = {}
		const recents = await fetch('/feed/recents.json')
		props = recents.ok ? { ...(await recents.json()), ...props } : props
		return { props }
	}
</script>

<script lang="ts">
	import NavTopics from '../../components/NavTopics.svelte'
	import {
		subscribedAuthors, // string[]
		subscribedTopics, // string[]
		authors, // { slug: User }
		authorslist, // User[]
		shouts, // { slug: Shout }
		shoutslist, // Shout[]
		topics, // { slug: Topic }
		topicslist // Topic[]
	} from '../../stores/zine'
	import { fade } from 'svelte/transition'
	import ShoutCard from '../../components/ShoutCard.svelte'
	import UserCard from '../../components/UserCard.svelte'
	import type { Shout } from '$lib/codegen'
	import { loading } from '../../stores/app'

	export let recents: Shout[]
	let topCommented

	$: if ($subscribedAuthors)
		(async () => {
			const aq = await fetch(`/feed/authors.json`, {
				method,
				headers,
				body: JSON.stringify({ authors: $subscribedAuthors })
			})
			if (aq.ok) {
				const data = await aq.json()
				if (data.shouts) $shoutslist = [...data.shouts, ...$shoutslist]
				if (data.authors) $authorslist = [...data.authors, ...$authorslist]
				console.log(data)
			}
		})()

	$: if ($subscribedTopics) {
		// NOTE: $topicslist should be preloaded by layout
		$subscribedTopics.forEach(async (topic) => {
			const tq = await fetch(`/feed/by-topic.json`, {
				method,
				headers,
				body: await JSON.stringify(topic)
			})
			if (tq.ok) {
				const data = await tq.json()
				if (data.authors) $authorslist = [...data.authors, ...$authorslist]
				if (data.shouts) $shoutslist = [...data.shouts, ...$shoutslist]
			}
		})
	}

	$: if ($shoutslist === null) {
		// TODO: add $subscribedShouts store
		// trigged by layout.onMount
		$loading = true
		console.log(
			`feed: loaded ${recents.length.toString()} recent shouts from api`
		)
		recents.forEach((s) => ($shouts[s.slug] = s))
		recents.forEach((s) => {
			s.authors.forEach((a) => {
				if (!(a.slug in $authors)) {
					$authorslist.push(a)
					$authors[a.slug] = a
				}
			})
			$shouts[s.slug] = s
		})
		console.log(`feed: found ${$authorslist.length.toString()} authors`)
		const byDate = (a, b) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		$shoutslist = recents.sort(byDate)

		// top commented
		topCommented = recents
			.filter((s) => s.stat.comments > 0)
			.sort((a, b) => b.stat.comments - a.stat.comments)
		console.log(
			`feed: found ${topCommented.length.toString()} commented from recentss`
		)
	}

	const moreShouts = () => {}
</script>

<section class="feed" transition:fade>
	{#if $shoutslist} <NavTopics shouts={$shoutslist} />{/if}

	<div class="feed-shouts">
		{#each [...Array(9).keys()] as r}
			{#if $shoutslist}
				<div class="floor" transition:fade>
					<div class="wide-container row">
						{#each $shoutslist.slice(r * 3, (r + 1) * 3) as shout}
							<div class="col-md-4">
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
			{#each $authorslist as user}
				<UserCard {user} />
			{/each}
		{/key}
	</div>
</section>
