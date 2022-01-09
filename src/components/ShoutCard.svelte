<script lang="ts">
	import { capitalize } from '$lib/utils'
	import type { Shout } from '$lib/codegen'
	import Icon from './DiscoursIcon.svelte'

	export let shout: Partial<Shout>
	export let additionalClass = ''
	export let noimage = false
	export let nosubtitle = false
	export let isGroup = false
	export let photoBottom = false

	const seps = [':', '?', '!']

	$: if (shout && !shout.subtitle) {
		// console.log('shoutcard: got shout ' + shout.slug)
		let tt = shout.title.split('.')
		seps.forEach((c) => {
			if (tt.length === 1) {
				tt = shout.title.split(c)
				if (tt.length > 1) tt[0] = tt[0] + (c === ':' ? '' : c)
			}
		})
		shout.title = tt[0]
		if (tt.length > 1) shout.subtitle = capitalize(tt[1], true)
	}
</script>

<section
	class="shout-card {additionalClass}"
	class:shout-card--short={noimage}
	class:shout-card--photo-bottom={noimage && photoBottom}
>
	{#if shout}
		{#if !noimage}
			<div class="shout-card__cover-container">
				<div class="shout-card__cover">
					<img src={shout.cover} alt={shout.title} loading="lazy" />
				</div>

				{#if shout.layout && shout.layout !== 'article'}
					<div class="shout-card__type">
						<Icon name={shout.layout} />
					</div>
				{/if}
			</div>
		{/if}

		<div class="shout-card__content">
			{#if !isGroup}
				{#each shout.topics.filter((t) => shout.mainTopic == t.slug) as topic}
					<div class="shout__topic">
						<a href="/topic/{topic.slug}">
							{topic.title}
						</a>
					</div>
				{/each}
			{/if}

			<div class="shout-card__title">
				<a href="/{shout.slug}">
					{@html shout.title}
				</a>
			</div>

			{#if !nosubtitle && shout.subtitle}
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

	:global(.col-md-6),
	:global(.col-md-8) {
		.shout-card__title {
			@include font-size(3.2rem);
		}

		.shout-card__subtitle {
			color: #696969;
			@include font-size(2rem);
		}
	}

	.shout-card {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
		margin-bottom: 2.4rem;
		position: relative;

		:global(.floor--1) &:nth-child(2) {
			border-top: 1px solid #141414;
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
		line-height: 1.1;
		margin-bottom: 0.8rem;

		a {
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

	:global(.floor--topics-group) {
		:global(h3) {
			&:first-letter {
				text-transform: uppercase;
			}
		}

		:global(.col-md-6 .col-md-6) {
			.shout-card {
				border-bottom: 1px solid rgba(255, 255, 255, 0.2);
				margin: 3.6rem 0 0;
				padding-bottom: 2rem;

				&:first-child {
					margin-top: 2rem;
				}

				&:last-child {
					border: none;
					padding-bottom: 0;
				}
			}

			.shout-card__cover-container {
				display: none;
			}

			.shout-card__title,
			.shout-card__subtitle {
				display: inline;
				@include font-size(2.6rem);
				line-height: 1.2;
			}

			.shout-card__subtitle {
				color: #fff;
			}

			.shout__author {
				margin-top: 0.6em;
			}
		}
	}

	:global(.floor--important) {
		padding-bottom: $container-padding-x;
		padding-top: $container-padding-x;

		@include media-breakpoint-up(md) {
			padding-bottom: $grid-gutter-width;
			padding-top: $grid-gutter-width;
		}

		:global(h2) {
			@include font-size(4.4rem);
			text-align: center;
		}

		.shout-card {
			margin-bottom: $grid-gutter-width;
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

	.shout-card--with-cover {
		padding: 56.2% 2.4rem 0;

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
			display: flex;
			flex-direction: column;
			justify-content: end;
			padding: 2.4rem;
			z-index: 1;
		}

		.shout-card__cover {
			padding: 0;

			&:after {
				background: rgba(0, 0, 0, 0.6);
				content: '';
				height: 100%;
				position: absolute;
				width: 100%;
				z-index: 1;
			}
		}

		.shout-card__title {
			@include font-size(3.2rem);
		}
	}

	.shout-card--content-top {
		.shout-card__content {
			justify-content: start;
		}
	}

	.shout-card--short {
		.shout-card__title {
			@include font-size(1.7rem);
		}
	}

	.shout-card--photo-bottom {
		.shout-card__content {
			margin-bottom: 1.6rem;
		}

		.shout-card__cover-container {
			order: 2;
		}
	}

	:global(.floor--slider) {
		.shout-card {
			.shout-card__cover-container {
				z-index: 1;
			}

			.shout-card__cover {
				&:after {
					background: linear-gradient(
						0deg,
						rgba(0, 0, 0, 0.8) 0%,
						rgba(0, 0, 0, 0) 75%
					);
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
			padding: 56.2% 2.4rem 0;

			@include media-breakpoint-between(xs, sm) {
				padding-top: 160%;
			}

			@include media-breakpoint-up(md) {
				padding-top: 160%;
			}
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

	:global(.floor--one-article) {
		@include media-breakpoint-up(md) {
			.shout-card {
				flex-direction: row;
			}

			.shout-card__cover {
				margin-bottom: 0;
			}

			.shout-card__cover-container {
				flex: 1 58.3333%;
			}

			.shout-card__content {
				display: flex;
				flex-direction: column;
				flex: 1 41.6666%;
				justify-content: space-between;
				padding-left: 4rem;
			}

			.shout__topic {
				margin-bottom: 3.2rem;
			}

			.shout-card__title {
				margin-bottom: 2.4rem;
			}

			.shout__author {
				align-items: end;
				display: flex;
				flex: 1;
			}
		}

		.shout-card__title {
			@include font-size(4rem);
			font-weight: 900;
			line-height: 1.1;
		}

		.shout-card__subtitle {
			color: #696969;
			flex: 1;
			@include font-size(2.4rem);
		}
	}
</style>
