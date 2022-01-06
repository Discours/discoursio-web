<script lang="ts">
	import type { User } from '$lib/codegen'
	import Userpic from './Userpic.svelte'
	import { subscribe, unsubscribe } from '$lib/cookie'
	import Icon from './DiscoursIcon.svelte'
	import { subscribedAuthors } from '../stores/zine'

	export let user: User | Partial<User>
	export let hasSubscribeButton = true
	export let hasFullInfo = false
	let subscribed = false
	$: if ($subscribedAuthors) subscribed = $subscribedAuthors.includes(user.slug)
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
						<button
							on:click={async () =>
								(subscribed = await unsubscribe(user.slug, 'authors'))}
							class="button button--subscribe"
							><Icon name="author-unsubscribe" />
							<span class="button__label">-&nbsp;Отписаться</span>
						</button>
					{:else}
						<button
							on:click={async () =>
								(subscribed = await subscribe(user.slug, 'authors'))}
							class="button button--subscribe"
						>
							<Icon name="author-subscribe" />
							<span class="button__label">+&nbsp;Подписаться</span>
						</button>
					{/if}

					{#if hasFullInfo}
						<button class="button button--write">
							<Icon name="edit" />
							Написать
						</button>

						{#if user.links}
							{#each user.links as link}
								<a href={link}>{link}</a>
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
		@include media-breakpoint-down(lg) {
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

		a[href*='vk.com/'] {
			&:before {
				background-image: url(/icons/vk-white.svg);
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
