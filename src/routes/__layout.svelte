<script context="module">
	import '../app.scss'
	// import dayjs from 'dayjs/esm'
	// import relativeTime from 'dayjs/esm/plugin/relativeTime'
	// dayjs().format()

	export const load = async ({ fetch }) => {
		const r = await fetch(`/topic/all.json`)
		let topicsAll = []
		if (r.ok) {
			const data = await r.json()
			topicsAll = data.topicsAll || []
		}
		return { props: { topicsAll } }
	}
</script>

<script lang="ts">
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
	import { browser } from '$app/env'
	import SvelteSeo from 'svelte-seo'
	import { page } from '$app/stores'
	// import 'virtual:windi.css'
	// import { initLocalizationContext } from '../i18n/index'
	// initLocalizationContext()

	export let topicsAll = []

	$: if (browser && !topicslist) {
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

	$: if ($topicslist && $topicslist.length > 0) $shoutslist = null

	onMount(async () => {
		$topicslist = null // force update, WARN: works only with null!
		$subscribedTopics = (await getSubscriptions(document.cookie, 'topics')) || []
		$subscribedAuthors =
			(await getSubscriptions(document.cookie, 'authors')) || []
		if (topicsAll.length > 0) {
			$topicslist = topicsAll
		} else {
			$topicslist = await JSON.parse(window.localStorage.getItem('topics') || '[]')
			console.log(`layout: loaded ${$topicslist.length} topics from localStorage`)
		}
		$topicslist.forEach((t) => ($topics[t.slug] = t))
		$loading = false
		await save()
		console.log('layout: mounted')
	})

	const save = async () => {
		const datastring = await JSON.stringify(topicsAll)
		if (window.localStorage['topics'] !== datastring) {
			window.localStorage['topics'] = datastring
			console.log(`layout: updated ${$topicslist.length} topics in localStorage`)
		}
	}
	const meta = {
		title: 'Дискурс',
		description: 'Самоорганизующаяся журналистика',
		keywords: 'Discours.io, дискурс, самыздат, коллаборативная редакция, авторы'
	}
</script>

<SvelteSeo
	{...meta}
	openGraph={{
		...meta,
		images: [{ url: 'https://new.discours.io/logo.png' }]
	}}
/>
<svelte:head>
	<link rel="shortcut icon" href="/favicon.png" />
</svelte:head>
<NavHeader />
{#key $page.url}
	<slot />
{/key}
<DiscoursFooter />
