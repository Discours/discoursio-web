<script>
	import NavUser from './NavUser.svelte'
	import { getLocalization } from '../i18n'
	import { onMount } from 'svelte'

	const { t } = getLocalization()

	let res = ''
	onMount(() => (res = window.location.pathname))

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
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="wide-container">
	<nav class="row header__inner">
		<div class="main-logo col-auto"><a href="/">Дискурc</a></div>

		<ul class="col main-navigation text-xl inline-flex">
			{#each MAIN_NAVIGATION as navItem}
				<li class:selected={res === navItem.href}>
					{#if res === navItem.href}
						{navItem.title}
					{:else if navItem.disabled}
						{navItem.title}
					{:else}
						<a href={navItem.href} on:click={() => (res = navItem.href)}
							>{navItem.title}</a
						>
					{/if}
				</li>
			{/each}
			<li class="float-right">
				<NavUser />
			</li>
		</ul>
	</nav>
</div>

<style lang="scss">
	.header__inner {
		flex-wrap: wrap;
	}

	.main-logo {
		align-items: center;
		display: inline-flex;
		flex-direction: row;
		flex: 0;
		font-size: 36px;
		font-weight: 700;
		height: 80px;
		padding-right: 3.2rem;
		text-align: center;
		text-transform: uppercase;

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

		.selected {
			border-bottom: 2px solid;
			color: #000;
		}
	}

	.float-right {
		width: 100%;
		text-align: right;
		padding-right: 1vw;
	}
</style>
