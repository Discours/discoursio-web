<script lang="ts">
  import '../app.scss'
  // import 'virtual:windi.css'
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import DiscoursFooter from '../components/DiscoursFooter.svelte'
  import { messages, messageslist } from '../stores/inbox'
  import {
    shoutslist,
    shouts,
    topicslist,
    topics,
    authors,
    authorslist,
    communities,
    communitieslist,
    comments,
  } from '../stores/zine'
  import { graphql } from '../stores/common'
  import { token, session } from '../stores/auth'
  import { GET_ME } from '../graphql/queries'
  import { GraphQLClient } from 'graphql-request'

  import shoutsData from '../data/articles.json'
  import commentsData from '../data/comments.json'
  import authorsData from '../data/authors.json'
  import topicsData from '../data/topics.json'
  import communitiesData from '../data/communities.json'
  import type { Community } from '../graphql/codegen'
  import { onMount } from 'svelte'

  let loaded = false
  let needMocks = false

  $: if (!loaded && needMocks) {
    console.log('app: root page loading mock data')
    $shouts = shoutsData
    $shoutslist = Object.values($shouts)
    $authors = authorsData
    $authorslist = Object.values($authors)
    $topics = topicsData
    $topicslist = Object.values($topics)
    $communitieslist = communitiesData
    $communitieslist.forEach((c: Community) => ($communities[c['slug']] = c))
    $comments = commentsData
    loaded = true
  }

  let graphql_endpoint = '/graphql'

  $: if ($token && window) {
    $graphql = new GraphQLClient(graphql_endpoint, {
      headers: { Auth: $token },
    })
    console.log('app: graphql connection is autorized')
    console.debug(token)
    $graphql.request(GET_ME).then((user) => ($session = user))
  }

  onMount(() => {
    graphql_endpoint =
      window.location.href.split('/').slice(0, -1).join('') + '/graphql'
    $graphql = new GraphQLClient(graphql_endpoint)
    console.debug($graphql)
    $token = document.cookie || ''
  })

  initLocalizationContext()
</script>

<header><NavHeader /></header>
{#if loaded}<main><slot /></main>{/if}
<DiscoursFooter />
