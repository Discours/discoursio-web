<script lang="ts">
	import type { User } from '../graphql/codegen'
	import Userpic from './Userpic.svelte'

	export let user: User | Partial<User>
	export let hasSubscribeButton
</script>

<div class="author">
	{#if user}
		<Userpic {user} />

		<div class="author__details">
			<div class="author__name text-3xl text-2xl">
				<a href="/@{user.slug}">{user.name}</a>
			</div>

			{#if user.bio}
				<div class="author__about">{user.bio}</div>
			{/if}
		</div>

		{#if hasSubscribeButton}
			<div class="author__subscribe">
				<button class="button button--subscribe">Подписаться</button>
			</div>
		{/if}
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
		flex: 1;
		padding-right: 1.2rem;
	}

	.author__name {
		font-size: 1.7rem;
		margin-bottom: 0.8rem;
	}

	.author__about {
		font-size: 1.5rem;
		color: rgba(0, 0, 0, 0.3);
	}

	@include media-breakpoint-down(lg) {
		.author__subscribe {
			flex: 1 100%;
			padding: 0.8rem 0 0 42px;
		}
	}
</style>
