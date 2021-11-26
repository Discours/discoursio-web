<script context="module">
	// import { metadata } from '@didiercatz/sveo'

	export const load = async ({ page }) => {
		try {
			const seo = {} // FIXME: await metadata(page)
			let props = { seo }
			const q = await fetch(`/feed/topics.json`)
			if (q.ok) props = { ...await q.json(), ...props }
			return { props }
		} catch (e) {
			console.error(e)
			return {}
			// return { props: { seo: null } }
		}
	}
</script>

<script lang="ts">
	import '../app.scss'
	// import 'virtual:windi.css'
	import { initLocalizationContext } from '../i18n/index'
	import NavHeader from '../components/NavHeader.svelte'
	import DiscoursFooter from '../components/DiscoursFooter.svelte'
	import { token, session } from '../stores/user'
	import { topicslist } from '../stores/zine'
	import { GET_ME } from '../lib/queries'
	import { onMount } from 'svelte'
	import { client } from '../lib/client'
	import Sveo from '@didiercatz/sveo'
	import type { Topic } from '../lib/codegen'

	export let seo
	export let topics: Topic[]
	initLocalizationContext()

	$: if ($token) {
		try {
			console.log('app: found user token')
			client.request(GET_ME).then((user) => {
				$session = user
				console.log('app: session store updated')
			})
		} catch (e) {
			console.error('app: graphql request failed')
		}
	}

	$: if(topics && !$topicslist) $topicslist = topics

	onMount(() => ($token = document.cookie))
</script>

<Sveo {seo} />
<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
