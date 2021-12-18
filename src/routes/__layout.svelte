<script context="module">
	import dayjs from 'dayjs/esm'
	import relativeTime from 'dayjs/esm/plugin/relativeTime'
	dayjs().format()

	export const load = async ({ page }) => {
		// const { metadata } = await import('@didiercatz/sveo')
		// FIXME
		let props
		// try { props = { seo: await metadata(page) } }
		// catch (e) { console.error(e) }
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
	// import { topicslist } from '../stores/zine'
	import { GET_ME, GET_ROLES } from '../lib/queries'
	import { onMount } from 'svelte'
	import { client } from '../lib/client'
	// import Sveo from '@didiercatz/sveo'
	// import type { Topic } from '../lib/codegen'

	// export let seo
	// export let topics: Topic[]
	initLocalizationContext()

	$: if ($token) {
		try {
			console.log('app: found user token')
			client.request(GET_ME).then((user) => {
				$session = user
				client.request(GET_ROLES, { slug: user.slug }).then((data) => {
					$roles = data
					console.log('app: my roles store updated')
				})
				console.log('app: session store updated')
			})
		} catch (e) {
			console.error('app: graphql request failed')
		}
	}

	//$: if (topics && !$topicslist) $topicslist = topics

	onMount(() => ($token = document.cookie))
</script>

<!--Sveo {seo} /-->
<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
