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
			client.request(GET_ME).then((user) => ($session = user))
		} catch (e) {
			console.error('graphql request failed')
		}
	}

	$: if ($session) {
		document.cookie = $token
	}

	onMount(() => {
		if (!$token) $token = document.cookie
	})

	initLocalizationContext()
</script>

<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
