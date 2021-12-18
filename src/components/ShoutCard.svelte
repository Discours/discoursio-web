<script lang="ts">
	import { capitalize } from '$lib/utils'
	import type { Shout } from '$lib/codegen'
	import Icon from './DiscoursIcon.svelte'

	export let shout: Shout

	const seps = [':', '?', '!']

	$: if (shout && !shout.subtitle) {
		let tt = shout.title.split('.')
		seps.forEach((c) => {
			if (tt.length === 1) {
				tt = shout.title.split(c)
				if (tt.length > 1) tt[0] = tt[0] + (c===':'?'':c)
			}
		})
		shout.title = tt[0]
		if(tt.length > 1) shout.subtitle = capitalize(tt[1], false)
	}
</script>

<section class="shout-card">
	{#if shout}
		<div class="shout-card__cover-container">
			<div class="shout-card__cover">
				<img src={shout.cover} alt={shout.title} />
			</div>

			{#if shout.layout && shout.layout !== 'article'}
				<div class="shout-card__type">
					<Icon name={shout.layout} />
				</div>
			{/if}
		</div>

		<div class="shout-card__content">
			{#each shout.topics.filter((t) => shout.mainTopic == t.slug) as topic}
				<div class="shout__topic">
					<a href="/topic/{topic.slug}">
						{topic.title}
					</a>
				</div>
			{/each}

			<div class="shout-card__title">
				<a href="/{shout.slug}">
					{@html shout.title}
				</a>
			</div>

			{#if shout.subtitle}
				<div class="shout-card__subtitle">{@html shout.subtitle}</div>
			{/if}

			<div class="shout__author">
				{#each shout.authors as a}
					{#if a}
						{#if shout.authors.indexOf(a) > 0}, {/if}
						<a href="/@{a.slug}">{a.name}</a>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	@import '../styles/imports';

	:global(.floor--2 .col-md-6) {
		&:first-child {
			.shout-card__cover {
				padding-bottom: 50%;
			}
		}

		&:last-child {
			.shout-card {
				flex-direction: row;
				margin-bottom: 2.4rem;
			}

			.shout-card__cover-container {
				@include make-col(4);
			}

			.shout-card__cover {
				margin-bottom: 0;
			}

			.shout-card__content {
				padding-left: 1.6rem;
			}

			.shout-card__title {
				font-size: 1.7rem;
			}

			.shout-card__title,
			.shout-card__subtitle {
				display: inline;
			}

			.shout__author {
				margin-top: 0.4rem;
			}
		}
	}

	.shout-card {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
		margin-bottom: 2.4rem;
		position: relative;

		:global(.floor--1) &:nth-child(2) {
			border-top: 1px solid rgba(0, 0, 0, 0.1);
			margin-top: 2.4rem !important;
			padding-top: 2.4rem;

			.shout-card__cover {
				display: none;
			}
		}
	}

	.shout-card__cover-container {
		position: relative;
	}

	.shout-card__cover {
		height: 0;
		margin-bottom: 1.6rem;
		padding-bottom: 56.2%;
		position: relative;

		img {
			height: 100%;
			object-fit: cover;
			position: absolute;
			width: 100%;
		}
	}

	.shout__topic,
	.shout__author {
		a {
			position: relative;
			z-index: 2;
		}
	}

	.shout-card__title {
		font-size: 2.2rem;
		font-weight: 700;
		margin-bottom: 0.8rem;

		a {
			color: $default-color;

			&:before {
				content: '';
				height: 100%;
				left: 0;
				position: absolute;
				top: 0;
				width: 100%;
				z-index: 1;
			}
		}
	}

	.shout-card__subtitle {
		font-size: 1.7rem;
		font-weight: 400;
		margin-bottom: 0.8rem;
	}

	.shout-card.withcover {
		padding: 2.4rem;

		&,
		a,
		.shout-card__title,
		.shout-card__subtitle {
			color: #fff;
		}

		.shout-card__cover {
			height: 100%;
			left: 0;
			padding: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;

			&:after {
				background: rgba(0, 0, 0, 0.6);
				height: 100%;
				position: absolute;
				width: 100%;
				z-index: 1;
			}
		}
	}

	.shout-card__type {
		background: #fff;
		border-radius: 100%;
		height: 3.2rem;
		position: absolute;
		right: 0.8rem;
		text-align: center;
		top: 0.8rem;
		width: 3.2rem;
		z-index: 1;

		:global(img) {
			height: auto;
			left: 50%;
			position: absolute;
			top: 50%;
			transform: translate(-50%, -50%);
			width: auto;
		}

		:global(.icon) {
			height: 100%;
		}
	}

	:global(.floor--3 .col-md-4) {
		.shout-card__cover-container {
			margin-top: 1.6rem;
			order: 2;
		}
	}

	:global(.floor--important) {
		padding-bottom: 0;
		padding-top: $container-padding-x;

		@include media-breakpoint-up(md) {
			padding-top: $grid-gutter-width;
		}

		:global(h2) {
			position: relative;
			text-align: center;

			&:before {
				background: #fff;
				content: '';
				height: 4px;
				left: $container-padding-x;
				position: absolute;
				top: 50%;
				width: calc(100% - #{$grid-gutter-width});
			}

			:global(span) {
				background: #000;
				padding: 0 $container-padding-x;
				position: relative;
				z-index: 1;
			}
		}

		.shout-card {
			margin-bottom: $grid-gutter-width;
		}

		.shout__topic,
		.shout-card__title {
			a {
				color: #fff;
			}
		}

		.shout-card__title,
		.shout-card__subtitle {
			display: inline;
		}

		.shout__author {
			margin-top: 0.8rem;
		}
	}

	:global(.floor--5 .col-md-4) {
		.shout-card__cover {
			padding-bottom: 62.5%;
		}

		.shout-card__title {
			font-size: 2.4rem;
		}
	}

	:global(.floor--6),
	:global(.floor--7),
	:global(.floor--teaser),
	:global(.floor--11 .col-md-8) {
		.shout-card {
			&,
			a,
			.shout-card__title,
			.shout-card__subtitle {
				color: #fff;
			}

			.shout-card__cover-container,
			.shout-card__cover,
			.shout-card__content {
				height: 100%;
				left: 0;
				margin: 0;
				position: absolute;
				top: 0;
				width: 100%;
				z-index: -1;
			}

			.shout-card__content {
				padding: 2.4rem;
				z-index: 1;
			}

			.shout-card__cover {
				padding: 0;

				&:after {
					background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
					content: '';
					height: 100%;
					position: absolute;
					width: 100%;
					z-index: 1;
				}
			}
		}
	}

	:global(.floor--6) {
		.shout-card {
			max-height: 55%;
			padding: 55% 2.4rem 0;
		}

		.shout-card__content {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}
	}

	:global(.floor--7) {
		.shout-card {
			padding: 160% 2.4rem 0;
		}

		.shout-card__title {
			font-size: 2.6rem;
		}
	}

	:global(.floor--9) {
		.shout-card__title,
		.shout-card__subtitle {
			display: inline;
			font-size: 2.2rem;
		}

		.shout__author {
			margin-top: 0.8rem;
		}

		.shout-card__cover {
			padding-bottom: 50%;
		}
	}

	:global(.floor--teaser) {
		.shout-card {
			min-height: 15em;
			padding-top: 33.33%;
		}

		.shout-card__content {
			justify-content: center;
			display: flex;
			flex-direction: column;
		}

		.shout-card__title {
			font-size: 4.8rem;
		}
	}

	:global(.floor--11) {
		:global(.col-md-4) {
			.shout-card__cover-container {
				margin-top: 1.6rem;
				order: 2;
			}
		}

		:global(.col-md-8) {
			.shout-card {
				padding-top: 50%;
			}

			.shout-card__title,
			.shout-card__subtitle {
				font-size: 2rem;
			}

			.shout-card__content {
				justify-content: flex-end;
				display: flex;
				flex-direction: column;
			}
		}
	}

	:global(.floor--12) {
		:global(.col-md-4):first-child {
			.shout-card__cover-container,
			.shout__topic {
				display: none;
			}

			.shout-card__title {
				font-size: 1.7rem;
			}
		}
	}
</style>
