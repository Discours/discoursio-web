<script context="module" lang="ts">
	export const prerender = true

	export const load = async ({ params, fetch }) => {
		const { slug } = params
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
	import { topics, topicslist } from '../../stores/zine'
	import TopicFull from '../../components/TopicFull.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import ShoutCard from '../../components/ShoutCard.svelte'
	import UserCard from '../../components/UserCard.svelte'
	import type { Shout, User } from '$lib/codegen'
	import { browser } from '$app/env'

	export let shouts: Shout[]
	export let authors: User[]
	export let slug: string

	let topic
	let mode

	$: if ($topicslist) topic = $topics[slug]
	onMount(() => {
		if (browser) slug = $page.params.slug
		console.log('topic: [' + slug + ']')
		topic = $topics[slug]
		mode = window.location.hash
	})

	const sortBy = (by) => {
		switch (by) {
			case 'popular':
				shouts = shouts.sort((a, b) => b.stat.views - a.stat.views)
				break
			case 'fresh':
				shouts = shouts.sort(
					(a, b) =>
						new Date(b.publishedAt).getMilliseconds() -
						new Date(a.publishedAt).getMilliseconds()
				)
				break
			case 'discuss':
				shouts = shouts.sort((a, b) => b.stat.comments - a.stat.comments)
				break
			default:
				mode = 'fresh'
		}
		mode = by
	}
	let moreLoading = false
	const moreShouts = async () => {
		moreLoading = true
		console.log('topicpage: show more shouts')
		const p = Math.floor((Object.keys(shouts).length - 27) / 27)
		const r = await fetch(`/topic/${slug}.json?page=${p}`)
		if (r.ok) {
			const { shouts: newData } = await r.json()
			console.debug(
				'topicpage: ' +
					Object.values(newData).length.toString() +
					' more shouts loaded'
			)
			shouts = [...shouts, ...newData]
		}
		moreLoading = false
	}
</script>

<svelte:head><title>Дискурс : {$page.params.slug}</title></svelte:head>
<TopicFull {topic} />

<div class="container">
	<div class="row topic__controls">
		<div class="col-md-8">
			<ul class="view-switcher">
				<li class:selected={mode === 'fresh'}>
					<button type="button" on:click={() => sortBy('fresh')}>Свежее</button>
				</li>
				<li class:selected={mode === 'popular'}>
					<button type="button" on:click={() => sortBy('popular')}>Популярное</button
					>
				</li>
				<li class:selected={mode === 'discuss'}>
					<button type="button" on:click={() => sortBy('discuss')}
						>Обсуждаемое</button
					>
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
		<div class="floor floor--one-article">
			<div class="row">
				{#each shouts.slice(0, 1) as shout}
					<div class="col-12">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor">
			<div class="row">
				{#each shouts.slice(1, 4) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor">
			<div class="row">
				{#each shouts.slice(4, 6) as shout}
					<div class="col-md-6">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor">
			<div class="row">
				<div class="col-md-4">
					<h3>Тему поддерживают</h3>
					{#each Object.values(authors).slice(0, 5) as user}
						<UserCard {user} />
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
			<div class="container">
				<div class="row">
					<h3 class="col-12">Популярное</h3>
					{#each shouts.slice(8, 10) as shout}
						<div class="col-md-6">
							<ShoutCard {shout}/>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="floor">
			<div class="row">
				{#each shouts.slice(10, 13) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor">
			<div class="row">
				{#each shouts.slice(13, 16) as shout}
					<div class="col-md-4">`
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor floor--important">
			<div class="container">
				<div class="row">
					<h3 class="col-12">Избранное</h3>
					{#each shouts.slice(16, 19) as shout}
						<div class="col-md-4">
							<ShoutCard {shout} />
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="floor">
			<div class="row">
				<div class="col-md-4">
					<ShoutCard shout={shouts[0]} />
				</div>
				<div class="col-md-8">
					<ShoutCard shout={shouts[1]} />
				</div>
			</div>
		</div>
		<div class="floor">
			<div class="row">
				{#each shouts.slice(2, 6) as shout}
					<div class="col-md-3">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>
		<div class="floor">
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
	<button class="button" type="button" on:click={moreShouts}>Показать еще</button
	>
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

	.show-more {
		margin-bottom: 6.4rem;
		text-align: center;
	}
</style>
