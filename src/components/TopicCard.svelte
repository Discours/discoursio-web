<script lang="ts">
	import type { Topic } from '$lib/codegen'
	import { plural, capitalize } from '$lib/utils'
	import { subscribe, unsubscribe } from '$lib/cookie'
	import { subscribedTopics } from '../stores/zine'

	export let topic: Topic | Partial<Topic>
	export let subscribed = false
	export let compact = false
	$: if ($subscribedTopics && topic && topic.slug)
		subscribed = $subscribedTopics.includes(topic.slug)
</script>

{#if topic}
	<div class="topic row">
		<div class="col-md-7">
			<div class="topic-title">
				<a href="/topic/{topic.slug}">{capitalize(topic.title)}</a>
			</div>
			{#if topic.pic}
				<div class="topic__avatar">
					<a href={topic.slug}>
						<img src={topic.pic} alt={topic.title} />
					</a>
				</div>
			{/if}
			{#if topic.body && !compact}
				<p class="topic-description" class:compact>
					{@html topic.body}
				</p>
			{/if}
			{#if topic.topicStat}
				<div class="topic-details">
					<span class="topic-details__item" class:compact
						>{topic.topicStat.shouts} публикаци{plural(
							topic.topicStat.shouts,
							'я',
							'и',
							'й'
						)}</span
					>
					<span class="topic-details__item" class:compact
						>{topic.topicStat.authors} автор{plural(
							topic.topicStat.authors,
							'',
							'а',
							'ов'
						)}</span
					>
					{#if !compact}
						<span class="topic-details__item"
							>{topic.topicStat.views} просмотр{plural(
								topic.topicStat.views,
								'',
								'а',
								'ов'
							)}</span
						>
						<span class="topic-details__item"
							>{topic.topicStat.subscriptions} подписчик{plural(
								topic.topicStat.subscriptions,
								'',
								'а',
								'ов'
							)}</span
						>
					{/if}
				</div>
			{/if}

			{#if subscribed}
				<button
					on:click={async () =>
						(subscribed = await unsubscribe(topic.slug, 'topics'))}
					class="button">-&nbsp;Отписаться</button
				>
			{:else}
				<button
					on:click={async () => (subscribed = await subscribe(topic.slug, 'topics'))}
					class="button">+&nbsp;Подписаться</button
				>
			{/if}
		</div>
		<div class="col-md-3">
			<!-- TODO: make avatar -->
		</div>
	</div>
{/if}

<style lang="scss">
	.topic {
		align-items: flex-start;
		display: flex;
		margin-top: 3.2rem;

		.stats .topic-details__item {
			margin-bottom: 3.2rem;
		}

		.button {
			background-color: #f6f6f6;
			color: #000;
			border: none;
			cursor: pointer;
			@include font-size(1.5rem);
			font-weight: 400;
			margin-top: 0.6rem;
			padding: 0.6rem 1.2rem 1rem 1rem;
		}
	}

	.topic-title {
		font-weight: bold;
		@include font-size(1.7rem);
		margin-bottom: 0.8rem;
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

	.topic-description {
		@include font-size(1.5rem);
		color: #696969;
		margin: 0 0 0.8rem;

		&.compact {
			font-size: medium;
		}
	}

	.topic-details {
		@include font-size(1.7rem);
		color: #9fa1a7;
	}

	.topic-details__item {
		margin-right: 1.6rem;

		&:last-child {
			margin-right: 0;
		}
		&.compact {
			font-size: small;
		}
	}
</style>
