<script lang="ts">
	import { ui, session, notices } from '../stores/user'
	import Icon from './DiscoursIcon.svelte'
	import Auth from './Auth.svelte'
	import Userpic from './Userpic.svelte'
	import { fade } from 'svelte/transition'
	import { getLocalization } from '../i18n'
	import { onMount } from 'svelte'
	import { messageslist } from '../stores/inbox'

	const { t } = getLocalization()

	let res = ''
	let newMessages = 0 // FIXME: get with query
	let newNotices = 0

	onMount(() => (res = window.location.pathname))

	const toggleLogin = () => {
		$ui.authModal = !$ui.authModal
	}

	const closeModal = (ev) => {
		if (
			(ev.target && ev.target.classList.contains('modalwrap')) ||
			ev.target.classList.contains('close-control')
		)
			$ui.authModal = false
	}

	const toggleNotices = () => {
		console.log('nav: showing notifications')
		$ui.showNotices = !$ui.showNotices
	}

	$: newNotices = $notices.filter((n) => !n.seen).length
	$: newMessages = $messageslist.length
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') $ui.authModal = false
	}}
/>

{#if $ui.authModal}
	<div class="modalwrap" transition:fade on:click|preventDefault={closeModal}>
		<Auth />
	</div>
{/if}
{#if $ui.showNotices}
	<div
		class="noticecorner fixed"
		transition:fade
		on:click|preventDefault={() => ($ui.showNotices = false)}
	>
		{#each $notices as notice}
			<div class="notice" class:error={notice.type === 'error'}>{notice.text}</div>
		{/each}
	</div>
{/if}
{#if $session}
	<div class="usercontrol inline-flex">
		<a href="/inbox">
			<div class:entered={res === '/inbox'}>
				<Icon name="inbox-white" counter={newMessages} />
			</div>
		</a>
		<a href={''} on:click|preventDefault={toggleNotices}>
			<div>
				<Icon name="bell-white" counter={newNotices} />
			</div>
		</a>
		<a href="/profile">
			<div class:entered={res === '/profile'}>
				<Userpic user={$session} />
			</div>
		</a>
	</div>
{:else}
	<div class="loginbtn inline-flex">
		<a href={''} on:click|preventDefault={toggleLogin}> войти </a>
	</div>
{/if}

<style lang="scss">
	.notice {
		width: auto;
	}

	.modalwrap {
		pointer-events: all;
		align-items: center;
		background: rgba(20, 20, 20, 0.7);
		display: flex;
		justify-content: center;
		height: 100%;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;
	}
	a {
		color: rgba(255, 255, 255, 0.64);

		&:hover {
			color: #fff;
		}
	}
</style>
