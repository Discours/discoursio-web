<script lang="ts">
	import UserCard from './UserCard.svelte'
	import { session } from '../stores/user'
	import MD from '../components/MD.svelte'

	export let props
	let shout
	let canEdit = false
	// TODO: editing logix
	$: shout = props.shout
	$: if ($session) {
		canEdit = !!shout.authors.find((a) => a.slug === $session.slug)
	}
</script>

<div class="shout">
	{#if shout}
		<div class="shout wide-container row">
			<article class="col-md-6 offset-md-3">
				<div class="shout__header">
					<div class="shout__topic article-card__category">
						{#each shout.topics as topic, index}
							<a href={`/${topic.slug}`}>#{topic.title}</a>
						{/each}
					</div>

					<h1>{shout.title}</h1>
					{#if shout.subtitle}<h4>{shout.subtitle}</h4>{/if}

					<div class="shout__author">
						{#each shout.authors as author, index}
							{#if index > 0}, {/if}
							{author.name}
						{/each}
					</div>

					<div
						class="shout__cover"
						style={`background-image: url('${shout.cover}')`}
					/>
				</div>

				<div class="shout__body">
					<MD body={shout.body} />
				</div>

				<div class="shout__authors-list">
					<h4>Авторы</h4>

					{#each shout.authors as user, index}
						{#if index > 0},{/if}
						<UserCard {user} hasSubscribeButton={false} />
					{/each}
				</div>
			</article>
		</div>
	{/if}
</div>

<style lang="scss">
	h1 {
		@include font-size(4rem);
		line-height: 1.1;
		margin-top: 0.5em;
	}

  :global(h2) {
    line-height: 1.1;
  }

	:global(img) {
		max-width: 100%;
	}

  .shout {
    padding-top: 2em;
  }

	.shout__header {
		margin: 0 -16.6666% 2em;
	}

	.article-card__category {
		font-size: 1.2rem;
		margin-bottom: 0.8rem;
		text-transform: uppercase;
	}

	.shout__cover {
		background-size: cover;
		height: 0;
		padding-bottom: 56.2%;
	}

	.shout__body {
		font-size: 1.7rem;
		line-height: 1.6;

		:global(img) {
			display: block;
			margin-bottom: 0.5em;
		}

		:global(blockquote) {
			border-left: 4px solid;
			font-size: 2rem;
			font-weight: 500;
			font-style: italic;
			line-height: 1.4;
			margin: 1.5em 0 1.5em -16.6666%;
			padding: 0 0 0 1em;
		}

		:global(mark) {
			background: none;
			font-size: 2rem;
			font-weight: bold;
			line-height: 1.4;
		}
	}

	.shout__author {
		margin-bottom: 2em;
	}

	.shout__authors-list {
		margin-top: 2em;

		:global(h4) {
			color: #696969;
			font-size: 1.5rem;
			font-weight: normal;
		}
	}
</style>
