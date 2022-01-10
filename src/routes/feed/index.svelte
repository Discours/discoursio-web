<script context="module">
	import 'swiper/css'
	import 'swiper/css/navigation'
	export const prerender = true
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
	} from '../../stores/zine'
	import { fade } from 'svelte/transition'
	import UserCard from '../../components/UserCard.svelte'
	import type { Shout } from '$lib/codegen'
	import { loading } from '../../stores/app'
	import ShoutFeed from '../../components/ShoutFeed.svelte'

	export let recents: Shout[]
	let topCommented

	$: if ($subscribedAuthors && $subscribedAuthors.length > 0) {
		(async () => {
			const aq = await fetch(
				`/feed/by-authors.json?authors=${await JSON.stringify($subscribedAuthors)}`
			)
			if (aq.ok) {
				const data = await aq.json()
				if (data.shouts) $shoutslist = [...data.shouts, ...$shoutslist]
				if (data.authors) $authorslist = [...data.authors, ...$authorslist]
				console.log(data)
			}
		})()
	}

	$: if ($subscribedTopics && $subscribedTopics.length > 0) {
		// NOTE: $topicslist should be preloaded by layout
		(async () => {
			const tq = await fetch(
				`/feed/by-topics.json?topics=${await JSON.stringify($subscribedTopics)}`
			)
			if (tq.ok) {
				const data = await tq.json()
				if (data.authors) $authorslist = [...data.authors, ...$authorslist]
				if (data.shouts) $shoutslist = [...data.shouts, ...$shoutslist]
			}
		})()
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
</script>

<section class="feed" transition:fade>
	{#if $shoutslist}
		<NavTopics shouts={$shoutslist} />
		<ShoutFeed />
	{/if}
</section>
