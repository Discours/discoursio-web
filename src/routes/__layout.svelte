<script lang="ts">
	import '../app.scss'
	// import 'virtual:windi.css'
	import { initLocalizationContext } from '../i18n/index'
	import NavHeader from '../components/NavHeader.svelte'
	import DiscoursFooter from '../components/DiscoursFooter.svelte'
	import { token, session } from '../stores/auth'
	import { api, endpoint } from '../stores/common'
	import { GET_ME } from '../graphql/queries'
	import { onMount } from 'svelte'

	onMount(async () => {
		console.debug($api)
		$token = document.cookie
		if ($token) {
			try {
				$api.request(GET_ME).then((user) => ($session = user))
			} catch (e) {
				console.error('graphql request failed')
			}
		}
	})

	initLocalizationContext()
</script>

<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
