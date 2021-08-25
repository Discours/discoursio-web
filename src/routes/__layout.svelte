<script lang="ts">
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import NavTopics from '../components/NavTopics.svelte'
  import '../app.scss'
  import shoutsData from '../data/articles.json'
  import authorsData from '../data/authors.json'
  import topicsData from '../data/topics.json'
  import communitiesData from '../data/communities.json'
  import {topics, shouts, authorslist, communitieslist} from '../stores/zine'

  $: $topics = topicsData
  $: $shouts = shoutsData
  $: $authorslist = authorsData
  $: $communitieslist = communitiesData

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
