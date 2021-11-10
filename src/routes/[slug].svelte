<script lang="ts" context="module">
	import type { Shout } from '../graphql/codegen'
	import type { Load } from '@sveltejs/kit'
	import { browser } from '$app/env'

	export const prerender = true

	interface WhatProps {
		shout?: Shout | Partial<Shout>
		slug: string
	}

	export const load: Load = async ({
		page,
		fetch,
		session,
		stuff
	}): Promise<{ props: WhatProps | Partial<WhatProps> }> => {
		let ret = { props: page.params }
		if (browser) {
			console.log('preloading skipped in browser')
		} else {
			const { slug } = page.params
			if (slug.startsWith('@')) {
				const r = await fetch(`/data/@${slug}.json`)
				const author = await r.json()
				ret = { props: { author, slug } }
			} else {
				const r = await fetch(`/data/_${slug}.json`)
				const shout = await r.json()
				ret = { props: { shout, slug } }
			}
		}
		return ret
	}
</script>

<script lang="ts">
	import type { Topic } from '../graphql/codegen'
	import { shouts, topics } from '../stores/zine'
	import TopicView from '../components/TopicCard.svelte'
	import { page } from '$app/stores'
	import MD from 'markdown-it'
	// import hl from 'markdown-it-highlight'
	import mdanch from 'markdown-it-anchor'
	import mark from 'markdown-it-mark'
	import implicit from 'markdown-it-implicit-figures'
	import mdcustom from 'markdown-it-container'
	import UserCard from '../components/UserCard.svelte'

	const mit = MD()
	mit.use(mdanch)
	// mit.use(hl)
	mit.use(mark)
	mit.use(mdcustom)

	mit.use(implicit, {
		dataType: false, // <figure data-type="image">
		figcaption: true // <figcaption>alternative text</figcaption>
	})

	export let props: WhatProps
	let shout: Shout | Partial<Shout>
	let topic: Topic | Partial<Topic>
	let slug = ''

	$: if ($shouts && $topics && $page.params.slug) {
		slug = $page.params.slug
		topic = <Topic>$topics[slug]
		if (!topic) shout = (props && props.shout) || <Shout>$shouts[slug]
	}
</script>

<svelte:head><title>Дискурс : {shout ? shout.title : ''}</title></svelte:head>

{#if shout && shout.body}
	<div class="shout wide-container row">
		<article class="col-md-6 offset-md-3">
			<div class="shout__header">
				<div class="shout__topic article-card__category">
					{#each shout.topics as topic, index}
						{#if index > 0},{/if}
						{topic}
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
				{#if shout.body.slice(0, 1) === '<'}
					{@html shout.body}
				{:else}
					{@html mit.render(shout.body)}
				{/if}
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
{:else}
	<TopicView {topic} />
{/if}

<style lang="scss">
	h1 {
		@include font-size(4rem);
		line-height: 1.1;
		margin-top: 0.5em;
	}

	:global(img) {
		max-width: 100%;
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
