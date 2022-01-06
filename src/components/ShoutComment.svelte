<script lang="ts">
	import type { Comment } from '$lib/codegen'
	import UserCard from './UserCard.svelte'
	// import { authors } from '../stores/zine'
	import MD from './MD.svelte'
	import Icon from './DiscoursIcon.svelte'
	// import dayjs from 'dayjs'
	// import 'dayjs/locale/ru'

	export let comment: Partial<Comment>
	export let canEdit: boolean // FIXME
	export let level = 0
	// dayjs.locale('ru')
	// {dayjs(comment.createdAt).format('D MMMM YYYY в HH:MM')}

	const edit = () => {
		console.log('// TODO: comment editing...')
	}

	const remove = () => {
		console.log('// TODO: comment remove...')
	}
</script>

<div class={'comment' + (level ? ' comment--level-' + level.toString() : '')}>
	{#if comment}
		<div class="shout-controls">
			<div class="shout-author">
				<UserCard user={comment.author} hasSubscribeButton={false} />
			</div>
			<div class="shout-date">
				{comment.createdAt}
			</div>
			<!--      <div class="shout-rating">{comment.rating}</div>-->
		</div>
		<div class="shout-body" contenteditable={canEdit}>
			<MD body={comment.body} />
		</div>
		<div class="comment-controls">
			<button class="comment-control comment-control--reply">
				<Icon name="reply" />
				Ответить</button
			>
			{#if canEdit}
				<button class="comment-control comment-control--edit" on:click={edit}>
					<Icon name="edit" />
					Редактировать
				</button>

				<button class="comment-control comment-control--delete" on:click={remove}>
					<Icon name="delete" />
					Удалить
				</button>
			{/if}

			<button class="comment-control comment-control--share">Поделиться</button>
			<button class="comment-control comment-control--complain"
				>Пожаловаться</button
			>
		</div>
	{/if}
</div>

<style lang="scss">
	.comment {
		background-color: #fff;
		margin: 0 -2.4rem 1.5em;
		padding: 0.8rem 2.4rem;
		transition: background-color 0.3s;

		&:hover {
			background-color: #f6f6f6;

			.comment-control--share,
			.comment-control--delete,
			.comment-control--edit,
			.comment-control--complain {
				opacity: 1;
			}
		}

		.shout-body {
			@include font-size(1.5rem);

			*:last-child {
				margin-bottom: 0;
			}
		}

		:global(.circlewrap) {
			position: absolute;
		}

		:global(.author) {
			align-items: center;
		}

		:global(.author__name) {
			font-weight: bold;
			@include font-size(1.2rem);
			margin-bottom: 0;
		}

		:global(.author__details) {
			margin-left: 4rem;
		}

		.shout-date {
			@include font-size(1.2rem);
			flex: 1;
			color: rgba(0, 0, 0, 0.3);
		}
	}

	.comment--level-1 {
		margin-left: 2.4rem;
	}

	.comment--level-2 {
		margin-left: 4.8rem;
	}

	.comment--level-3 {
		margin-left: 7.2rem;
	}

	.comment--level-4 {
		margin-left: 9.6rem;
	}

	.comment--level-5 {
		margin-left: 12rem;
	}

	.shout-controls {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
		padding-top: 0.8rem;
	}

	.comment-controls {
		margin-bottom: 0.5em;
	}

	.comment-control--share,
	.comment-control--delete,
	.comment-control--edit,
	.comment-control--complain {
		opacity: 0;
		transition: opacity 0.3s;
	}

	.comment-control {
		background: rgba(0, 0, 0, 0.05);
		border: none;
		cursor: pointer;
		display: inline-flex;
		line-height: 1.2;
		margin-right: 0.8rem;
		padding: 0.2em 0.3em;
		vertical-align: top;

		:global(.icon) {
			margin-right: 0.3em;

			:global(img) {
				margin-bottom: -0.1em;
			}
		}
	}

	.comment-control--reply {
		:global(.icon) {
			height: 1.2em;
			width: 1.2em;
		}
	}
</style>
