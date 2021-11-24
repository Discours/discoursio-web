<script lang="ts">
	import '../app.scss'
	// import 'virtual:windi.css'
	import { initLocalizationContext } from '../i18n/index'
	import NavHeader from '../components/NavHeader.svelte'
	import DiscoursFooter from '../components/DiscoursFooter.svelte'
	import { token, session } from '../stores/user'
	import { GET_ME } from '../lib/queries'
	import { onMount } from 'svelte'
	import { client } from '../lib/client'

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

	onMount(() => ($token = document.cookie))

	initLocalizationContext()
</script>

<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
