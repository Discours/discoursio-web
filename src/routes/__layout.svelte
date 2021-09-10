<script lang="ts">
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import '../app.scss'
  import { onMount } from 'svelte'
  import {
    shoutslist,
    shouts,
    topicslist,
    topics,
    authors,
    authorslist,
    communities,
    communitieslist,
  } from '../stores/zine'
  import { graphql, GRAPHQL_ENDPOINT } from '../stores/common'
  import { token, session } from '../stores/auth'
  import { GET_ME } from '../graphql/queries'
  import { GraphQLClient } from 'graphql-request'

  $: if ($token) {
    $graphql = new GraphQLClient(GRAPHQL_ENDPOINT, {
      headers: { Auth: $token },
    })
    console.log('app: graphql connection is autorized')
    console.debug(token)
    $graphql.request(GET_ME).then((user) => ($session = user))
  }

  onMount(() => {
    console.log('app loading data...')
    // TODO: data loading calls
    $shoutslist.forEach((s) => ($shouts[s.slug] = s))
    $topicslist.forEach((s) => ($topics[s.slug] = s))
    $authorslist.forEach((s) => ($authors[s.slug] = s))
    $communitieslist.forEach((s) => ($communities[s.slug] = s))
  })

  initLocalizationContext()
</script>

<header>
  <NavHeader />
</header>
<main>
  <slot />
</main>
<footer />

<style lang="scss" global>
  @import '../app.scss';
</style>
