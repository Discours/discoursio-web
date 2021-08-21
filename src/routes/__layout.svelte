<script lang="ts">
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import NavTopics from '../components/NavTopics.svelte'
  import '../app.scss'
  import shoutsData from '../data/articles.json'
  import authorsData from '../data/authors.json'
  import topicsData from '../data/topics.json'
  import { topics, shouts } from '../stores/zine'

  $: $topics = topicsData
  $: $shouts = shoutsData

  initLocalizationContext()
</script>

<header>
  <NavHeader/>
</header>
<main>
  <NavTopics />
  <slot />
</main>
<footer />

<style lang="scss" global>
  @import '../app.scss';
</style>
