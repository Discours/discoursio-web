<script lang="ts">
	import { ui, session, notices, token } from '../stores/user'
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
	$: newMessages = $messageslist ? $messageslist.length : 0
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
{#if $token}
	<div class="usercontrol col">
		<div class="usercontrol__item usercontrol__item--write-post">
			<a href="/create">
				<span class="text-label">опубликовать материал</span>
				<Icon name="pencil" />
			</a>
		</div>
		<div class="usercontrol__item usercontrol__item--search">
			<a href="#">
				<Icon name="search" />
			</a>
		</div>
		<div class="usercontrol__item usercontrol__item--inbox">
			<a href="/user/inbox">
				<div class:entered={res === '/user/inbox'}>
					<Icon name="inbox-white" counter={newMessages} />
				</div>
			</a>
		</div>
		<div class="usercontrol__item">
			<a href={''} on:click|preventDefault={toggleNotices}>
				<div>
					<Icon name="bell-white" counter={newNotices} />
				</div>
			</a>
		</div>
		<div class="usercontrol__item">
			<a href="/user">
				<div class:entered={res === '/user'}>
					<Userpic user={$session} />
				</div>
			</a>
		</div>
	</div>
{:else}
	<div class="usercontrol col">
		<div class="usercontrol__item loginbtn">
			<a href={''} on:click|preventDefault={toggleLogin}> войти </a>
		</div>
	</div>
{/if}

<style lang="scss">
	.usercontrol {
		align-items: baseline;
		display: flex;
		@include font-size(1.7rem);
		justify-content: flex-end;

		@include media-breakpoint-down(md) {
			padding: divide($container-padding-x, 2);
		}

		:global(.circlewrap) {
			margin-right: 0;
		}
	}

	.usercontrol__item {
		margin-left: divide($container-padding-x, 2);

		@include media-breakpoint-up(sm) {
			margin-left: 3.2rem;
		}

		:global(img) {
			height: 20px;
			vertical-align: middle;
			width: auto;
		}

		.text-label {
			display: none;
		}
	}

	.usercontrol__item--write-post {
		@include media-breakpoint-up(md) {
			:global(.icon) {
				display: none;
			}

			.text-label {
				display: inline;
			}
		}
	}

	.usercontrol__item--inbox,
	.usercontrol__item--search {
		@include media-breakpoint-down(sm) {
			display: none;
		}
	}

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
		color: #000;

		&:hover {
			color: #000;
		}
	}
</style>
