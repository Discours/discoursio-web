<script context="module">
	import dayjs from 'dayjs/esm'
	// import relativeTime from 'dayjs/esm/plugin/relativeTime'
	dayjs().format()

	export const load = async ({ fetch }) => {
		const topicsAll = await fetch(`/topic/all.json`)
		const props = topicsAll.ok
			? { ...(await topicsAll.json()) }
			: { ...topicsAll }
		console.log(
			'layout: preloaded ' + props.topicsAll.length.toString() + ' topics'
		)
		return { props }
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
	import { browser } from '$app/env'
	// import 'virtual:windi.css'
	// import { initLocalizationContext } from '../i18n/index'
	// initLocalizationContext()

	export let topicsAll = []

	$: if (browser && !topicslist) {
		fetch(`/topic/all.json`)
			.then((r) => r.ok && r.json())
			.then((ttt) => {
				$topicslist = ttt.topicsAll
				console.log(
					'layout: loaded ' +
						$topicslist.length.toString() +
						' topics with browser request'
				)
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
			console.log(
				'layout: loaded ' +
					$topicslist.length.toString() +
					' topics from localStorage'
			)
		}
		$topicslist.forEach((t) => ($topics[t.slug] = t))
		$loading = false
		await save()
		console.log('layout: mounted')
	})

	const save = async () => {
		const datastring = await JSON.stringify(topicsAll)
		if (window.localStorage['topics'] !== datastring) {
			window.localStorage['topics'] !== datastring
			console.log(
				`layout: updated ${$topicslist.length.toString()} topics in localStorage`
			)
		}
	}
</script>

<!--Sveo {seo} /-->
<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
