<script lang="ts">
	export let topic
	// TODO: topic full is a community topic feed index
</script>

<div class="topic-full container">
	<!--{#if topic}-->
	{JSON.stringify(topic)}
	<div class="row">
		<div class="topic__header col-md-8 offset-md-2">
			<h1>#{topic.title}</h1>
			<p>{topic.body}</p>
			<div class="topic__actions">
				<button>Подписаться на тему</button>
				<button>Написать в тему</button>
			</div>
			<!--
				<img src={topic.pic} />
				<h1>#{topic.title}</h1>
				{#if topic.body}
					<div class="topic-body">
						{@html topic.body}
					</div>
				{/if}
			--></div>
	</div>

	<!--{/if}-->
</div>

<style lang="scss">
	h1 {
		color: #2638D9;
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

		button {
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
