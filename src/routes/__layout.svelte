<script context="module">
	import dayjs from 'dayjs/esm'
	import relativeTime from 'dayjs/esm/plugin/relativeTime'
	dayjs().format()

	export const load = async ({ page, fetch }) => {
		const topicsAll = await fetch(`/topic/all.json`)
		const props = topicsAll.ok
			? { ...(await topicsAll.json()) }
			: { ...topicsAll }
		return { props }
	}
</script>

<script lang="ts">
	import '../app.scss'
	// import 'virtual:windi.css'
	import { initLocalizationContext } from '../i18n/index'
	import NavHeader from '../components/NavHeader.svelte'
	import DiscoursFooter from '../components/DiscoursFooter.svelte'
	import { token, session, roles } from '../stores/user'
	import { topicslist, topics } from '../stores/zine'
	import { GET_ME, GET_ROLES } from '../lib/queries'
	import { onMount } from 'svelte'
	import { client } from '../lib/client'
	import { getSubscriptions } from '$lib/cookie'
	import { subscribedTopics, subscribedAuthors } from '../stores/zine'

	initLocalizationContext()

	export let topicsAll = []
	$: {
		if ($token) {
			try {
				console.log('app: found user token')
				client.request(GET_ME).then((user) => {
					$session = user
					client.request(GET_ROLES, { slug: user.slug }).then(async (data) => {
						console.log(data)
						$roles = data
						console.log('app: my roles store updated')
					})
					console.log('app: session store updated')
				})
			} catch (e) {
				console.error('app: graphql request failed')
			}
		}
		if (!$topicslist && topicsAll) {
			console.log('preload: ' + topicsAll.length.toString() + ' topics')
			$topicslist = topicsAll
			window.localStorage['topics'] = $topicslist
			$topicslist.forEach((t) => ($topics[t.slug] = t))
			console.debug('layout: topics udpated')
		}
	}

	onMount(async () => {
		console.debug('layout: mounted')
		if (document.cookie.replace('token=', '') !== document.cookie)
			$token = document.cookie.split('token=')[1].split(';')[0]
		$subscribedTopics = (await getSubscriptions(document.cookie, 'topics')) || []
		$subscribedAuthors =
			(await getSubscriptions(document.cookie, 'authors')) || []
		if (!topicsAll) {
			$topicslist = window.localStorage['topics']
			$topicslist.forEach((t) => ($topics[t.slug] = t))
		}
		$topicslist = null
	})
</script>

<!--Sveo {seo} /-->
<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
