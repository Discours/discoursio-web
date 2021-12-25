<script context="module" lang="ts">
	export const prerender = true

	export const load = async ({ page, fetch }) => {
		const { slug } = page.params
		let props = { slug }
		const q = await fetch(`/topic/${slug}.json`)
		if (q.ok) {
			const data = await q.json()
			props = { ...data, ...props }
		}
		return { props }
	}
</script>

<script lang="ts">
	import { topics } from '../../stores/zine'
	import TopicFull from '../../components/TopicFull.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import ShoutCard from '../../components/ShoutCard.svelte'
	import UserCard from '../../components/UserCard.svelte'

	export let shouts
	export let authors
	export let slug

	let topic
	let mode = 'fresh'

	$: if (!slug && $page && $page.params.slug) slug = $page.params.slug
	$: if (slug && !topic && $topics) topic = $topics[slug]

	onMount(() => {
		topic = null
	})

	const sortByPopular = () => {
		shouts = shouts.sort((a, b) => b.stat.views - a.stat.views)
		mode = 'popular'
	}

	const sortByDiscuss = () => {
		shouts = shouts.sort((a, b) => b.stat.comments - a.stat.comments)
		mode = 'discuss'
	}

	const sortByDate = () => {
		shouts = shouts.sort(
			(a, b) =>
				new Date(b.publishedAt).getMilliseconds() -
				new Date(a.publishedAt).getMilliseconds()
		)
		mode = 'fresh'
	}
</script>

<svelte:head><title>Дискурс : {$page.params.slug}</title></svelte:head>
{#if topic}
	<TopicFull {topic} />
{/if}

<div class="container">
	<div class="row topic__controls">
		<div class="col-md-8">
			<ul class="view-switcher">
				<li class:selected={mode === 'fresh'}>
					<button type="button" on:click={() => sortByDate()} >Свежее</button>
				</li>
				<li class:selected={mode === 'popular'}>
					<button type="button" on:click={sortByPopular}>Популярное</button>
				</li>
				<li class:selected={mode === 'discuss'}>
					<button type="button" on:click={sortByDiscuss}>Обсуждаемое</button>
				</li>
			</ul>
		</div>

		<div class="col-md-4">
			<div class="mode-switcher">
				Показывать
				<span class="mode-switcher__control">Все публикации</span>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="floor floor--1 col-12">
			<div class="row">
				{#each shouts.slice(0, 1) as shout}
					<div class="col-12">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				{#each shouts.slice(1, 4) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				{#each shouts.slice(4, 6) as shout}
					<div class="col-md-6">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				<div class="col-md-4">
					<h3>Тему поддерживают</h3>
					{#each Object.keys(authors).slice(0, 5) as key}
						<UserCard user={authors[key]} />
					{/each}
				</div>
				{#each shouts.slice(6, 8) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor floor--important">
			<div class="row">
				<h3 class="col-12">Популярное</h3>
				{#each shouts.slice(8, 10) as shout}
					<div class="col-md-6">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				{#each shouts.slice(10, 13) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				{#each shouts.slice(13, 16) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor floor--important">
			<div class="row">
				<h3 class="col-12">Избранное</h3>
				{#each shouts.slice(16, 19) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				<div class="col-md-4">
					<ShoutCard shout={shouts[0]} />
				</div>
				<div class="col-md-8">
					<ShoutCard shout={shouts[1]} />
				</div>
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				{#each shouts.slice(2, 6) as shout}
					<div class="col-md-3">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor col-12">
			<div class="row">
				<div class="col-md-8">
					<ShoutCard shout={shouts[6]} />
				</div>
				<div class="col-md-4">
					<ShoutCard shout={shouts[7]} />
				</div>
			</div>
		</div>
	</div>
</div>

<div class="show-more">
	<button class="button" type="button">Показать еще</button>
</div>

<style lang="scss">
	.topic__controls {
		align-items: baseline;
		margin-bottom: 7rem;
		margin-top: 7rem;
	}

	.view-switcher {
		margin-bottom: 0;
	}

	.mode-switcher {
		@include font-size(1.5rem);
		text-align: right;
	}

	.mode-switcher__control {
		border-bottom: 1px dotted;
		cursor: pointer;
		font-weight: bold;
	}

	.floor--1 {
		@include media-breakpoint-up(md) {
			:global(.shout-card) {
				flex-direction: row;
			}

			:global(.shout-card__cover) {
				margin-bottom: 0;
			}

			:global(.shout-card__cover-container) {
				flex: 1 58.3333%;
			}

			:global(.shout-card__content) {
				display: flex;
				flex-direction: column;
				flex: 1 41.6666%;
				justify-content: space-between;
				padding-left: 4rem;
			}

			:global(.shout__topic) {
				margin-bottom: 3.2rem;
			}

			:global(.shout-card__title) {
				margin-bottom: 2.4rem;
			}
		}

		:global(.shout-card__title) {
			@include font-size(4rem);
			font-weight: 900;
			line-height: 1.1;
		}

		:global(.shout-card__subtitle) {
			color: #696969;
			flex: 1;
			@include font-size(2.4rem);
		}
	}

	.show-more {
		margin-bottom: 6.4rem;
		text-align: center;
	}
</style>
