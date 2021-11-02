<script>
	import { createEventDispatcher, onMount } from 'svelte'
	import loader from '../lib/asyncloader'
	import Icon from './DiscoursIcon.svelte'

	const dispatch = createEventDispatcher()

	let signinCta
	export let clientId
	export let text = ''
	let disabled = true
	let gapi

	onMount(() => {
		clientId &&
			loader(
				[{ type: 'script', url: '//apis.google.com/js/api:client.js' }],
				() => {
					gapi = window['gapi']
					return gapi
				},
				() => initialise()
			)
	})

	let GoogleAuth

	function initialise() {
		gapi = window['gapi']
		gapi.load('auth2', async () => {
			GoogleAuth = gapi.auth2.init({ client_id: clientId })
			GoogleAuth.then(attachHandler, handleInitialisationError)
		})
	}

	function attachHandler() {
		GoogleAuth.attachClickHandler(
			signinCta,
			{},
			() => dispatch('auth-success', { user: GoogleAuth.currentUser.get() }),
			(e) => dispatch('auth-failure', { error: e })
		)
		disabled = false
	}

	function handleInitialisationError(e) {
		console.error('gauth initialisation error', e)
		dispatch('init-error', { error: e })
	}
</script>

<div bind:this={signinCta} {disabled} class="google-auth">
	<Icon name="google" /><span>{text}</span>
</div>

<style>
	.google-auth {
		width: 100%;
		border: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.google-auth span {
		font-family: Roboto, sans-serif;
		font-size: 14px;
		font-weight: bold;
	}
</style>
