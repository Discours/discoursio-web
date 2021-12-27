<script lang="ts">
	import type { Topic } from '../lib/codegen'
	import { onMount } from 'svelte'
	import { plural, capitalize } from '../lib/utils'

	export let topic: Topic | Partial<Topic>
	export let subscribed = false
	export let compact

	// NOTE: cookie-based no auth requering subscriptions

	onMount(async () => {
		// let { topics } = JSON.parse(decodeURI(document.cookie))
		// if (topics) subscribed = topics.includes(topic.slug)
	})

	const subscribe = async () => {
		console.log('topic: subscribing')
		// TODO
		console.log(document.cookie)
	}

	const unsubscribe = async () => {
		console.log('topic: unsubscribing')
		// TODO
	}
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
			{#if topic.body}
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
		</div>
		<div class="col-md-3">
			{#if subscribed}
				<button on:click={unsubscribe} class="button">-&nbsp;Отписаться</button>
			{:else}
				<button on:click={subscribe} class="button">+&nbsp;Подписаться</button>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.topic {
		align-items: flex-start;
		display: flex;
		margin-top: 6.4rem;

		.stats & {
			margin-bottom: 6.4rem;
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
		@include font-size(2.6rem);
		margin-bottom: 1.2rem;
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
		color: #696969;
		margin-bottom: 2rem;

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
