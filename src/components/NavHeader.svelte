<script>
	import NavUser from './NavUser.svelte'
	import { getLocalization } from '../i18n'
	import { onMount } from 'svelte'

	const { t } = getLocalization()

	let res = ''
	onMount(() => (res = window.location.pathname))
	let isBurgerHidden = true
	let body = null

	const toggleBurger = () => {
		isBurgerHidden = !isBurgerHidden
		body.classList.toggle('fixed', !isBurgerHidden)
	}

	const MAIN_NAVIGATION = [
		{
			title: 'журнал', // популярное/рекомендованное
			href: '/'
		},
		{
			title: 'лента', // актуальное
			href: '/feed'
		},
		{
			title: 'темы',
			href: '/topic'
		},
		{
			title: 'сообщество',
			href: '/community',
			disabled: true
		}
	]

	onMount(() => {
		body = document.querySelector('body')
	})
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="wide-container">
	<nav class="row header__inner" class:header__inner--fixed={!isBurgerHidden}>
		<div class="main-logo col-auto">
			<a href="/">
				<img src="/logo.svg" alt="Дискурс" />
			</a>
		</div>

		<ul class="col main-navigation text-xl inline-flex"
				class:main-navigation--open={!isBurgerHidden}>
			{#each MAIN_NAVIGATION as navItem}
				<li class:selected={res === navItem.href}>
					{#if res === navItem.href}
						<strong>{navItem.title}</strong>
					{:else if navItem.disabled}
						{navItem.title}
					{:else}
						<a href={navItem.href} on:click={() => (res = navItem.href)}
							>{navItem.title}</a
						>
					{/if}
				</li>
			{/each}
		</ul>

		<NavUser />

		<div class="burger-container">
			<div class="burger" class:burger--close={!isBurgerHidden} on:click={toggleBurger}>
				<div></div>
			</div>
		</div>
	</nav>
</div>

<style lang="scss">
	.header__inner {
		background: #fff;
		flex-wrap: wrap;
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

	.main-navigation {
		display: inline-flex;
		@include font-size(1.7rem);
		list-style: none;
		margin: 0;
		padding: 0;

		@include media-breakpoint-down(lg) {
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
				margin-right: 0;
			}
		}

		a {
			color: #000;

			&:hover {
				color: #000;
			}
		}

		.selected strong {
			border-bottom: 2px solid;
			color: #000;
		}
	}

	.main-navigation--open {
		display: inline-flex;

		@include media-breakpoint-down(lg) {
			display: block !important;
		}
	}

	.float-right {
		width: 100%;
		text-align: right;
		padding-right: 1vw;
	}

	.burger-container {
		box-sizing: content-box;
		display: inline-flex;
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
