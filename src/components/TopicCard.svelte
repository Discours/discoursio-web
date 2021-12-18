<script lang="ts">
	import type { Topic } from '../lib/codegen'
	import { onMount } from 'svelte'
	import cookie from 'cookie'
	import { plural, capitalize } from '../lib/utils'

	export let topic: Topic | Partial<Topic>
	export let subscribed = false
	export let compact

	// NOTE: cookie-based no auth requering subscriptions

	onMount(async () => {
		const { topics } = await cookie.parse(document.cookie)
		if (topics) subscribed = topics.includes(topic.slug)
	})

	const subscribe = async () => {
		let coo = await cookie.parse(document.cookie)
		if (coo.topics && !coo.topics.includes(topic.slug))
			coo.topics.push(topic.slug)
		document.cookie = cookie.serialize(coo)
	}

	const unsubscribe = async () => {
		let coo = await cookie.parse(document.cookie)
		if (!coo.topics) coo.topics = []
		const idx = coo.topics.indexOf(topic.slug)
		if (idx != -1) coo.topics.splice(idx, 1)
		document.cookie = cookie.serialize(coo)
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
			{#if topic.body && !compact}
				<p class="topic-description">
					{@html topic.body}
				</p>
			{/if}
			{#if topic.topicStat && !compact}
				<div class="topic-details">
						<span class="topic-details__item"
						>{topic.topicStat.shouts} публикаци{plural(
							topic.topicStat.shouts,
							'я',
							'и',
							'й'
						)}</span
						>
					<span class="topic-details__item"
					>{topic.topicStat.authors} автор{plural(
						topic.topicStat.authors,
						'',
						'а',
						'ов'
					)}</span
					>
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
				</div>
			{/if}
		</div>
		<div class="col-md-3 offset-md-2">
			{#if subscribed}
				<button on:click={unsubscribe} class="button"
				>Отписаться</button
				>
			{:else}
				<button on:click={subscribe} class="button"
				>Подписаться</button
				>
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
			padding: 0.6rem 1.2rem;
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
	}
</style>
