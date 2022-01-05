<script>
	import NavAuth from './NavAuth.svelte'
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import { openModal } from '../stores/app'
	import { token } from '../stores/user'
	import { onMount } from 'svelte'
	import Auth from './Auth.svelte'
	import Modal from './Modal.svelte'

	let isBurgerHidden = true
	const routes = [
		{ name: 'журнал', href: '/' },
		{ name: 'лента', href: '/feed' },
		{ name: 'темы', href: '/topic' }
	]
	const toggleBurger = () => {
		isBurgerHidden = !isBurgerHidden
		document.body.classList.toggle('fixed', !isBurgerHidden)
	}

	onMount(() => {
		isBurgerHidden = window.screen.width > 990
	})
</script>

<header>
	<Modal name='auth'><Auth /></Modal>
	<div class="wide-container">
		<nav class="row header__inner" class:header__inner--fixed={!isBurgerHidden}>
			<div class="main-logo col-auto">
				<a href="/">
					<img src="/logo.svg" alt="Дискурс" />
				</a>
			</div>
			<ul
				class="col main-navigation text-xl inline-flex"
				class:main-navigation--open={!isBurgerHidden}
			>
				{#each routes as r}
					<li class:selected={$page.url.pathname === r.href}>
						<a sveltekit:prefetch href={r.href}>{r.name}</a>
					</li>
				{/each}
				<li class="usernav">
					{#if $token}
						<NavAuth />
					{:else}
						<div class="usercontrol col">
							<div class="usercontrol__item loginbtn">
								<a href={'#auth'} on:click={() => ($openModal = 'auth')}
									>войти</a>
							</div>
						</div>
					{/if}
				</li>
			</ul>
			<div class="burger-container">
				<div
					transition:fade
					class="burger"
					class:burger--close={!isBurgerHidden}
					on:click={toggleBurger}
				>
					<div />
				</div>
			</div>
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		border-bottom: 4px solid #000;
		margin-bottom: 2.2rem;
	}
	.header__inner {
		background: #fff;
		//flex-wrap: wrap;
		justify-content: space-between;
	}

	.header__inner--fixed {
		border-bottom: 4px solid #000;
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		padding: 0 $container-padding-x;
		z-index: 10;
	}

	.main-logo {
		align-items: center;
		display: inline-flex;
		height: 70px;
		padding: 0 $container-padding-x;
		text-align: center;
		position: relative;
		z-index: 10;

		@include media-breakpoint-down(sm) {
			padding-left: divide($container-padding-x, 2);
		}

		@include media-breakpoint-up(lg) {
			height: 80px;
		}

		img {
			vertical-align: middle;
			width: 100px;

			@include media-breakpoint-up(lg) {
				width: 175px;
			}
		}

		a {
			color: #000;
		}
	}

	nav {
		align-items: center;
	}

	.usernav {
		display: inline-flex;
		width: auto;

		@include media-breakpoint-down(md) {
			padding-left: 0;
			padding-right: 0;
		}
	}

	.main-navigation {
		display: inline-flex;
		@include font-size(1.7rem);
		list-style: none;
		margin: 0;
		padding: 0;

		@include media-breakpoint-down(md) {
			background: #fff;
			bottom: 0;
			display: none;
			font-size: 2.6rem;
			font-weight: bold;
			left: 0;
			padding: $container-padding-x;
			position: fixed;
			top: 74px;
			width: 100%;
			z-index: 1;

			li {
				margin-bottom: 2.4rem;
			}
		}

		li {
			margin-right: 2.4rem;

			&:last-child {
				text-align: right;
				width: 100%;
			}
		}

		a {
			color: #000;

			&:hover {
				color: #000;
			}
		}

		.selected a {
			border-bottom: 2px solid;
			color: #000;
			pointer-events: none;
			cursor: default;
		}
	}

	.main-navigation--open {
		display: inline-flex;

		@include media-breakpoint-down(lg) {
			display: block !important;
		}
	}

	.burger-container {
		box-sizing: content-box;
		display: inline-flex;
		float: right;
		padding-left: 0;
		width: 2.2rem;

		@include media-breakpoint-up(sm) {
			padding-left: divide($container-padding-x, 2);
		}

		@include media-breakpoint-up(md) {
			display: none;
		}
	}

	.burger {
		background: #fff;
		cursor: pointer;
		height: 1.8rem;
		display: inline-block;
		position: relative;
		vertical-align: middle;
		width: 2.2rem;

		> div,
		&:after,
		&:before {
			background: #000;
			content: '';
			display: block;
			height: 2px;
			left: 0;
			position: absolute;
			width: 100%;
		}

		> div {
			margin-top: -1px;
			opacity: 1;
			top: 50%;
			transition: opacity 0.2s 0.1s;
		}

		&:after,
		&:before {
			transform-origin: center !important;
			transition: top 0.3s, transform 0.3s;
		}

		&:after {
			bottom: 0;
		}

		&:before {
			top: 0;
		}
	}

	.burger--close {
		> div {
			opacity: 0;
			transition: opacity 0s;
		}

		&:after {
			bottom: 0.8rem;
			transform: rotate(-45deg);
		}

		&:before {
			transform: rotate(45deg);
			top: 0.8rem;
		}
	}
</style>
