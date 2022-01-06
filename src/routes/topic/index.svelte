<script lang="ts" context="module">
	export const prerender = true
</script>

<script lang="ts">
	import type { Topic } from '$lib/codegen'
	import TopicCard from '../../components/TopicCard.svelte'
	import { topicslist, subscribedTopics } from '../../stores/zine'

	let topics: Partial<Topic>[]
	let mode = 'views'
	let sortedKeys = []
	let topicsGroupedByAlphabet = []

	const groupBy = (arr) => {
		let firstLetter = null
		return arr.reduce(
			(acc, currentValue) => {
				let currentLetter = currentValue.title.slice(0, 1)
				if (/[a-zA-Z0-9]/.test(currentLetter)) {
					currentLetter = 'A-Z'
				} else if (!acc[currentLetter]) {
					firstLetter = currentLetter
					acc[firstLetter] = []
				}
				acc[currentLetter].push(currentValue)
				return acc
			},
			{ 'A-Z': [] }
		)
	}

	$: if ($topicslist) {
		if (mode === 'alphabet') {
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
		} else {
			topics = $topicslist.sort((a, b) => b.topicStat[mode] - a.topicStat[mode])
		}
	}
</script>

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
				<li class:selected={mode === 'views'}>
					<a href="#views" on:click={() => (mode = 'views')}>По просмотрам</a>
				</li>
				<li class:selected={mode === 'shouts'}>
					<a href="#shouts" on:click={() => (mode = 'shouts')}>По публикациям</a>
				</li>
				<li class:selected={mode === 'alphabet'}>
					<a href="#alphabet" on:click={() => (mode = 'alphabet')}>По алфавиту</a>
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
			{:else}
				<div class="stats">
					{#each topics as topic}
						<TopicCard
							{topic}
							compact={false}
							subscribed={$subscribedTopics && $subscribedTopics.includes(topic.slug)}
						/>
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
