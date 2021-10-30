<script lang="ts">
	import type { Topic } from '../graphql/codegen'
	export let topic: Topic | Partial<Topic>
</script>

<div class="topic">
	{#if topic}
		<div class="topic__avatar">
			<a href={topic.slug}>
				<img src={topic.pic} alt={topic.title} />
			</a>
		</div>
		<div class="topic__details">
			<div class="topic__name">
				<a href={topic.slug}>{topic.title}</a>
			</div>
			<div class="topic__about">{@html topic.body}</div>
			<div class="topic__subscribe">
				<button class="button button--subscribe">Подписаться</button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.topic {
		align-items: flex-start;
		display: flex;
		margin-bottom: 2.4rem;

		@include media-breakpoint-down(lg) {
			flex-wrap: wrap;
		}
	}

	.topic__avatar {
		border-radius: 100%;
		height: 64px;
		margin-right: 1.2rem;
		min-width: 64px;
		max-width: 64px;
		overflow: hidden;
		position: relative;
		width: 64px;

		img {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
	}

	.topic__details {
		flex: 1;
		padding-right: 1.2rem;
	}

	.topic__name {
		font-size: 1.7rem;
		margin-bottom: 0.8rem;
	}

	.topic__about {
		font-size: 1.5rem;
		color: rgba(0, 0, 0, 0.3);
	}

	.topic__subscribe {
		margin-top: 0.8rem;
	}
</style>
