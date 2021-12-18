<script lang="ts">
	import type { User } from '../lib/codegen'
	import Userpic from './Userpic.svelte'
	import cookie from 'cookie'
	import { onMount } from 'svelte'
	import Icon from './DiscoursIcon.svelte'

	export let user: User | Partial<User>
	export let hasSubscribeButton = true
	export let subscribed = false
	export let hasFullInfo = false

	// NOTE: cookie-based no auth requering subscriptions

	onMount(async () => {
		const data = await cookie.parse(document.cookie)
		if (data && data.authors)
			data.authors.forEach((a) => {
				if (a.slug === user.slug) subscribed = true
			})
	})

	const subscribe = async () => {
		let coo = await cookie.parse(document.cookie)
		if (!coo) coo = { authors: [] }
		if (!coo.authors) coo.authors = []
		if (!coo.authors.includes(user.slug)) coo.authors.push(user.slug)
		document.cookie = cookie.serialize(coo)
	}

	const unsubscribe = async () => {
		let coo = await cookie.parse(document.cookie)
		const idx = coo.authors.indexOf(user.slug)
		if (idx != -1) coo.authors.splice(idx, 1)
		document.cookie = cookie.serialize(coo)
	}
</script>

<div class="author">
	{#if user}
		<Userpic {user} />

		<div class="author__details">
			<div class="author__details-wrapper">
				<div class="author__name text-3xl text-2xl">
					<a href="/@{user.slug}">{user.name}</a>
				</div>

				{#if user.bio}
					<div class="author__about">{user.bio}</div>
				{/if}
			</div>

			{#if hasSubscribeButton}
				<div class="author__subscribe">
					{#if subscribed}
						<button on:click={unsubscribe} class="button button--subscribe"
							>Отписаться</button
						>
					{:else}
						<button on:click={subscribe} class="button button--subscribe">
							<Icon name="author-subscribe"/>
							<span class="button__label">Подписаться</span>
						</button>
					{/if}

					{#if hasFullInfo}
						<button class="button button--write">
							<Icon name="edit"/>
							Написать
						</button>

						{#if user.links}
							{#each user.links as link}
								<a href="{link}"></a>
							{/each}
						{/if}
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.author {
		align-items: flex-start;
		display: flex;
		margin-bottom: 2.4rem;

		@include media-breakpoint-down(lg) {
			flex-wrap: wrap;
		}
	}

	.author__details {
		display: flex;
		flex: 1;
		padding-right: 1.2rem;
	}

	.author__details-wrapper {
		flex: 1;
	}

	.author__name {
		font-size: 1.7rem;
		margin-bottom: 0.8rem;
	}

	.author__about {
		font-size: 1.5rem;
		color: rgba(0, 0, 0, 0.3);
	}

	.author__subscribe {
		margin-top: 2rem;

		@include media-breakpoint-down(lg) {
			flex: 1 100%;
			padding: 0.8rem 0 0 42px;
		}

		a {
			background: #f7f7f7;
			display: inline-block;
			height: 32px;
			margin-right: 0.4rem;
			position: relative;
			vertical-align: middle;
			width: 32px;

			&:before {
				background-repeat: no-repeat;
				background-position: 50% 50%;
				background-size: contain;
				content: '';
				filter: invert(1);
				height: 18px;
				left: 50%;
				position: absolute;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 18px;
			}
		}

		a[href*='facebook.com/'] {
			&:before {
				background-image: url(/icons/facebook-white.svg);
			}
		}

		a[href*='twitter.com/'] {
			&:before {
				background-image: url(/icons/twitter-white.svg);
			}
		}

		a[href*='telegram.com/'] {
			&:before {
				background-image: url(/icons/telegram-white.svg);
			}
		}
	}

	.button--subscribe {
		background: #f6f6f6;
		border-radius: 2.5rem;
		display: inline-flex;

		:global(img) {
			vertical-align: middle;
		}
	}

	.button__label {
		display: none;
	}

	.button--write {
		background: #f7f7f7;
		color: #000;
		display: inline-flex;
		@include font-size(1.5rem);

		:global(.icon) {
			margin-right: 0.5em;
		}

		:global(img) {
			height: 15px;
		}
	}
</style>
