<script lang="ts">
	import UserCard from './UserCard.svelte'
	import ShoutComment from './ShoutComment.svelte'
	import { session, token, ui } from '../stores/user'
	import { onMount } from 'svelte'
	import MD from '../components/MD.svelte'
	import type { Topic } from '$lib/codegen'
	import { capitalize } from '$lib/utils'

	export let props
	let shout
	let canEdit
	let commentsById: { [key: number]: Partial<Comment> } = {}

	onMount(() => {
		if (shout.comments.length === 0) console.log('shout: no comments')
	})

	// TODO: editing logix
	$: shout = props.shout
	$: if ($session) {
		canEdit = !!shout.authors.find((a) => a.slug === $session.slug)
	}

	$: if (shout.comments && shout.comments.length > 0) {
		shout.comments.forEach((c) => {
			commentsById[c.id] = c
		})
	}

	const deepest = 6

	const getCommentLevel = (c, level = 0) => {
		if (c && c.replyTo && level < deepest) {
			level += 1
			return getCommentLevel(commentsById[c.replyTo], level)
		} else {
			return level
		}
	}

	let showTopic: Partial<Topic>

	$: if (shout) {
		showTopic = shout.topics[0]
		if (shout.mainTopic) {
			showTopic = shout.topics.find((t) => {
				if (t === undefined) return
				else return t.slug === shout.mainTopic
			})
		}
		// console.log(showTopic)
	}
</script>

<div class="shout">
	{#if shout}
		<div class="shout wide-container row">
			<article class="col-md-6 offset-md-3">
				<div class="shout__header">
					<div class="shout__topic article-card__category">
						{#each shout.topics as topic}
							<span class="topic"
								><a href={`/topic/${topic.slug}`}
									>#{@html topic.title.replace(' ', '&nbsp;')}</a
								></span
							>
						{/each}
					</div>

					<h1>{shout.title}</h1>
					{#if shout.subtitle}<h4>{capitalize(shout.subtitle, false)}</h4>{/if}

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

			<div class="col-md-8 offset-md-3">
				<h2>Комментарии {shout.comments.length}</h2>

				{#each shout.comments as comment}
					<ShoutComment
						{comment}
						level={getCommentLevel(comment)}
						canEdit={comment.author.id === $session.id}
					/>
				{/each}
				{#if !$token}
					<div class="comment-warning">
						Чтобы оставить комментарий, необходимо
						<a href={''} on:click|preventDefault={() => ($ui.authModal = true)}
							><i>зарегистрироваться или войти</i></a
						>
					</div>
				{:else}
					<textarea
						class="write-comment"
						rows="1"
						placeholder="Написать комментарий"
					/>
				{/if}
			</div>
		</div>
	{:else}
		Загрузка...
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

	.write-comment {
		border: 2px solid #f6f6f6;
		@include font-size(1.7rem);
		outline: none;
		padding: 0.2em 0.4em;
		width: 100%;

		&::placeholder {
			color: #858585;
		}
	}

	.comment-warning {
		background: #f6f6f6;
		@include font-size(2.2rem);
		margin-bottom: 1em;
		padding: 2.4rem 1.8rem;
	}

	.topic {
		display: inline-flex;
	}

	.topic a {
		/* white-space: nowrap; */
		color: black;
		padding: 0.3vh;
	}
	.topic a:hover {
		font-weight: 500;
	}
</style>
