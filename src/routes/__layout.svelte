<script lang="ts">
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import NavTopics from '../components/NavTopics.svelte'
  import '../app.scss'
  import { onMount } from 'svelte'
  import type { Shout } from '../graphql/codegen'
  import { shoutslist, shouts, topicslist, topics, authors, authorslist, communities, communitieslist } from '../stores/zine'

  onMount(() => {
    console.log('app loading data...')
    // TODO: data loading calls
    $shoutslist.forEach(s => $shouts[s.slug] = s)
    $topicslist.forEach(s => $topics[s.slug] = s)
    $authorslist.forEach(s => $authors[s.slug] = s)
    $communitieslist.forEach(s => $communities[s.slug] = s)
  })

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
