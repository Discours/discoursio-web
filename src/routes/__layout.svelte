<script lang="ts">
  import '../app.scss'
  // import 'virtual:windi.css'
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import DiscoursFooter from '../components/DiscoursFooter.svelte'
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
  import { graphql } from '../stores/common'
  import { token, session } from '../stores/auth'
  import { GET_ME } from '../graphql/queries'
  import { GraphQLClient } from 'graphql-request'

  $: if ($token) {
    $graphql = new GraphQLClient('/graphql', {
      headers: { Auth: $token },
    })
    console.log('app: graphql connection is autorized')
    console.debug(token)
    $graphql.request(GET_ME).then((user) => ($session = user))
  }

  onMount(() => {
    // import('virtual:windi-devtools')
    console.log('app loading data...')
    // TODO: data loading calls
    $shoutslist.forEach((s) => ($shouts[s.slug] = s))
    $topicslist.forEach((s) => ($topics[s.slug] = s))
    $authorslist.forEach((s) => ($authors[s.slug] = s))
    $communitieslist.forEach((s) => ($communities[s.slug] = s))
  })

  initLocalizationContext()
</script>

<header><NavHeader /></header>
<main><slot /></main>
<DiscoursFooter />
