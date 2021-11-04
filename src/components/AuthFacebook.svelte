<script lang="ts">
	import Icon from './DiscoursIcon.svelte'
	import { onMount, createEventDispatcher } from 'svelte'
	import loader from '../lib/asyncloader'
	import { FACEBOOK_APP_ID } from '../stores/auth'

	const dispatch = createEventDispatcher()

	const version = 'v11.0'

	let disabled = true
	export let text = ''
	let FB

	onMount(() => {
		loader(
			[{ type: 'script', url: '//connect.facebook.net/ru_RU/sdk.js' }],
			() => {
				FB = window['FB']
				return FB
			},
			() => initialise()
		)
	})

	function initialise() {
		console.log('auth: fb async init')
		FB = window['FB']
		FB.init({
			appId: FACEBOOK_APP_ID,
			cookie: true,
			xfbml: false,
			version
		})
		disabled = false
	}

	function login() {
		FB = window['FB']
		FB.login(
			function (response) {
				if (response.status === 'connected') {
					const authResponse = response.authResponse
					const userId = authResponse.userID
					const accessToken = authResponse.accessToken

					dispatch('auth-success', {
						accessToken,
						userId
					})
				} else {
					dispatch('auth-info', { response })
				}
			},
			{ scope: 'email,public_profile' }
		)
	}
</script>

<div on:click={login} {disabled} class="facebook-auth">
	<Icon name="facebook" /><span>{text}</span>
</div>

<style>
	.facebook-auth span {
		font-family: Roboto, sans-serif;
		font-size: 14px;
		font-weight: bold;
	}
</style>
