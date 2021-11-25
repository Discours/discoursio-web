<script context="module">
	// import { metadata } from '@didiercatz/sveo'

	export const load = async ({ page }) => {
	  try { 
		  const seo = {} // FIXME: await metadata(page) 
	  	return { props: { seo } }
	  } catch(e) {
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
	import { GET_ME } from '../lib/queries'
	import { onMount } from 'svelte'
	import { client } from '../lib/client'
	import Sveo from '@didiercatz/sveo'
  
	export let seo

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

<Sveo {seo}/>
<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />