<script lang="ts">
	import { subscribe, unsubscribe } from '$lib/cookie'

	export let subscribed
	export let topic
	// TODO: topic full is a community topic feed index
</script>

<div class="topic-full container">
	<div class="row">
		<div class="topic__header col-md-8 offset-md-2">
			<h1>#{topic.title}</h1>
			{#if topic.body}
				<p>{topic.body}</p>
			{/if}
			<div class="topic__actions">
				{#if subscribed}
					<button
						on:click={async () =>
							(subscribed = await unsubscribe(topic.slug, 'topics'))}
						class="button">Отписаться от темы</button
					>
				{:else}
					<button
						on:click={async () =>
							(subscribed = await subscribe(topic.slug, 'topics'))}
						class="button">Подписаться на тему</button
					>
				{/if}
				<a href={'/create?topic=' + topic.slug}>Написать в тему</a>
			</div>
			{#if topic.pic}<img src={topic.pic} />{/if}
		</div>
	</div>

	<!--{/if}-->
</div>

<style lang="scss">
	h1 {
		color: #2638d9;
		@include font-size(2rem);
		letter-spacing: 0.08em;
		margin-bottom: 4rem;
		text-transform: uppercase;
	}

	.topic__header {
		@include font-size(1.7rem);
		padding-top: 5.8rem;
		text-align: center;
	}

	.topic__actions {
		margin-top: 2.8rem;

		button,
		a {
			background: #000;
			border: none;
			border-radius: 2px;
			color: #fff;
			cursor: pointer;
			font-size: 100%;
			margin: 0 1.2rem;
			padding: 0.8rem 1.6rem;
		}
	}
</style>
