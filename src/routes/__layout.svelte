<script context="module">
// import dayjs from 'dayjs/esm'
// import relativeTime from 'dayjs/esm/plugin/relativeTime'
// dayjs().format()

export const load = async ({ fetch }) => {
	const r = await fetch(`/topic/all.json`)
	let topicsAll = []
	if (r.ok) {
		const data = await r.json()
		topicsAll = data.topicsAll || []
		console.debug('layout: ssr loaded all topics')
	}
	return { props: { topicsAll } }
}
</script>

<script lang="ts">
import '../app.scss'
import NavHeader from '../components/NavHeader.svelte'
import DiscoursFooter from '../components/DiscoursFooter.svelte'
import { onMount } from 'svelte'
import { getSubscriptions } from '$lib/cookie'
import {
	topicslist,
	topics,
	subscribedTopics,
	subscribedAuthors,
	shoutslist
} from '../stores/zine'
import { loading } from '../stores/app'

export let topicsAll = []

onMount(async () => {
	$topicslist = null // force update, WARN: works only with null!
	$subscribedTopics = (await getSubscriptions('topics')) || []
	$subscribedAuthors = (await getSubscriptions('authors')) || []
	if (topicsAll.length > 0) {
		$topicslist = topicsAll
	} else {
		$topicslist = await JSON.parse(window.localStorage.getItem('topics') || '[]')
		console.log(`layout: loaded ${$topicslist.length} topics from localStorage`)
	}
	$topicslist.forEach((t) => ($topics[t.slug] = t))
	$loading = false
	const datastring = await JSON.stringify(topicsAll)
	if (window.localStorage['topics'] !== datastring) {
		window.localStorage['topics'] = datastring
		console.log(`layout: updated ${$topicslist.length} topics in localStorage`)
	}

	if (!topicsAll) {
		fetch(`/topic/all.json`)
			.then((r) => r.ok && r.json())
			.then((ttt) => {
				if ($topicslist != ttt.topicsAll) {
					$topicslist = ttt.topicsAll
					console.log(
						`layout: loaded ${$topicslist.length} topics with browser request`
					)
				}
			})
	}
	$shoutslist = null
	console.log('layout: mounted')
})
</script>

<svelte:head>
	<link rel="shortcut icon" href="/favicon.png" />
</svelte:head>

<NavHeader />
<main><slot /></main>
<DiscoursFooter />
