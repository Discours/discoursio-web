<script lang="ts">
	import '../app.scss'
	// import 'virtual:windi.css'
	import { initLocalizationContext } from '../i18n/index'
	import NavHeader from '../components/NavHeader.svelte'
	import DiscoursFooter from '../components/DiscoursFooter.svelte'
	import { graphql } from '../stores/common'
	import { token, session } from '../stores/auth'
	import { GET_ME } from '../graphql/queries'
	import { GraphQLClient } from 'graphql-request'
	import { onMount } from 'svelte'

	let graphql_endpoint = 'https://0.0.0.0:8080'

	$: if ($token && window) {
		$graphql = new GraphQLClient(graphql_endpoint, {
			headers: { Auth: $token },
		})
		console.log('app: graphql connection is autorized')
		console.debug(token)
		try {
			$graphql.request(GET_ME).then((user) => ($session = user))
		} catch (e) {
			console.error('graphql request failed')
		}
	}

	onMount(async () => {
		if (window.location.hostname === 'localhost') {
			graphql_endpoint = 'https://0.0.0.0:8080'
		} else {
			graphql_endpoint = 'https://' + window.location.host + '/graphql'
		}
		$graphql = new GraphQLClient(graphql_endpoint)
		console.debug($graphql)
		await document
		$token = document.cookie || ''
	})

	initLocalizationContext()
</script>

<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
