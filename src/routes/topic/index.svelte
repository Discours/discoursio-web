<script lang="ts" context="module">
	import type { Topic } from '../../lib/codegen'
	export const prerender = true

	export const load = async ({
		fetch
	}): Promise<{ props: { topics: Partial<Topic>[] } }> => {
		console.log('topic/index: fetching all topics')
		const fq = await fetch(`/topic/all.json`)
		if (fq.ok) {
			const { topicsAll: topics } = await fq.json()
			return { props: { topics } }
		} else return { props: { topics: [] } }
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import TopicCard from '../../components/TopicCard.svelte'

	export let topics: Partial<Topic>[]
	let mode = ''
	let sortedKeys = []
	let topicsGroupedByAlphabet = []

	const groupBy = (arr) => {
		let firstLetter = null
		return arr.reduce((acc, currentValue) => {
			const currentLetter = currentValue.title.slice(0, 1)
			if (!acc[currentLetter]) {
				firstLetter = currentLetter
				acc[firstLetter] = []
			}
			acc[currentLetter].push(currentValue)
			return acc
		}, {})
	}

	$: if (mode === 'popular') {
		// console.log('topics: sorting by views')
		topics = topics.sort((a, b) => b.topicStat.views - a.topicStat.views)
		console.log(topics)
	}

	$: if (mode === 'active') {
		// console.log('topics: sorting by shouts')
		topics = topics.sort((a, b) => b.topicStat.shouts - a.topicStat.shouts)
		console.log(topics)
	}

	$: if (mode === 'alphabet') {
		// console.log('topics: sorting by alphabet')
		topicsGroupedByAlphabet = groupBy(topics.slice(0))
		sortedKeys = Object.keys(topicsGroupedByAlphabet).sort()
		sortedKeys.forEach((letter) => {
			topicsGroupedByAlphabet[letter] = topicsGroupedByAlphabet[letter].sort(
				(a, b) => {
					if (a.title > b.title) {
						return 1
					} else if (a.title < b.title) {
						return -1
					}
					return 0
				}
			)
		})
	}

	const onSwitch = () => {
		mode = window.location.hash.replace('#', '')
		if (!mode) {
			mode = 'popular'
			window.location.hash = mode
		}
	}

	onMount(onSwitch)
</script>

<svelte:window on:hashchange={onSwitch} />

<div class="container">
	<div class="row">
		<div class="col-md-9">
			<h1>Темы</h1>
			<p>
				Подпишитесь на интересующие вас темы, чтобы настроить вашу персональную
				летну и моментально узнавать о новых публикациях и обсуждениях
			</p>
		</div>
	</div>

	<div class="row">
		<div class="col">
			<ul class="view-switcher">
				<li class:selected={mode === 'popular'}>
					<a href="#popular">Популярные</a>
				</li>
				<li class:selected={mode === 'active'}>
					<a href="#active">Активные</a>
				</li>
				<li class:selected={mode === 'alphabet'}>
					<a href="#alphabet">По алфавиту</a>
				</li>
			</ul>

			{#if mode === 'alphabet'}
				{#each sortedKeys as letter}
					<div class="group">
						<h2>{letter}</h2>

						<div class="container">
							<div class="row">
								{#each topicsGroupedByAlphabet[letter] as topic}
									<div class="topic col-3">
										<div class="topic-title">
											<a href="/topic/{topic.slug}">{topic.title}</a>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			{/if}

			{#if mode === 'popular' || mode === 'active'}
				<div class="stats">
					{#each topics as topic}
						<TopicCard {topic} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.view-switcher {
		font-weight: bold;
		list-style: none;
		margin: 0 0 1.5em;
		padding: 0;

		li {
			display: inline-block;
			margin-right: 1em;
		}

		a {
			border-bottom: 2px solid #fff;
			color: #696969;
		}

		.selected {
			a {
				border-color: #000;
				color: #000;
				cursor: default;
			}
		}
	}

	.group {
		font-weight: bold;
		margin-bottom: 9.6rem;

		h2 {
			margin-bottom: 3.2rem;
			text-transform: capitalize;
		}

		.container {
			margin-left: $grid-gutter-width;
			padding-right: $container-padding-x;
			width: auto;
		}
	}
</style>
