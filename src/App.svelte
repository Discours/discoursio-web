<script>
  import { onMount } from 'svelte'
  // import { Query } from './graphql/codegen'
  // import { client } from './graphql/client.ts'
  // import { initLocalizationContext } from './i18n/index'
  // import { ApolloLink } from '@apollo/client'
  import NavHeader from './components/NavHeader.svelte'
  import Home from './pages/Home.svelte'
  import NotFound from './pages/NotFound.svelte'
  import Forum from './pages/Forum.svelte'
  import Community from './pages/Community.svelte'
  import Editor from './components/Editor.svelte'
  import Feed from './pages/Feed.svelte'
  import Create from './pages/Create.svelte'
  import Search from './pages/Search.svelte'
  import Login from './pages/Login.svelte'
  import Inbox from './pages/Inbox.svelte'
  import Shout from './pages/Shout.svelte'
  import { Matcher, Match } from 'svelte-store-router'
  import { route, pages } from './stores/router'
  import { token, session } from './stores/auth'
  import { getPageTitle } from './lib/common'
  import { org } from './stores/common'

  export const router = {
    // visible static
    '/search': { component: Search, caption: 'search', public: true },
    '/login': { component: Login, caption: 'login', public: true },
    '/create': { component: Create, caption: 'create', public: true },
    // needs precompiler / prerender
    '/': { component: Home, caption: 'home', public: true }, // topShouts
    '/feed': { component: Feed, caption: 'feed' }, // TODO: myShouts by stored subscriptions on categories and authors
    '/a/:shout': { component: Shout, public: true }, // getShout
    '/a/:project/:shout': { component: Shout, public: true },
    '/p/:project': { component: Shout, public: true },
    '/o/:org': { component: Shout, public: true }, // TODO: subdomain logix
    // realtime apps for internal users only
    '/editor': { component: Editor, caption: 'editor' }, // collaborative editor shared by rooms in orgs, works with git-controlled content
    '/forum': { component: Forum, caption: 'forum', public: true }, // TODO: getForum with pagination
    '/inbox': { component: Inbox, caption: 'inbox' }, // TODO: myInbox all the personal messages
    '/community': { component: Community, caption: 'community' }, // TODO: myCommunity publications stats / insights
  }

  export let shout = ''

  $: $pages = $pages || router

  // initLocalizationContext()

  let title

  const checkAuth = (token) => {
    if (token) {
      console.log('app: auth token found, trying to restore session')
      console.debug(token)
      // TODO: $session = Query.getCurrentUser()
    } else {
      console.log('app: no auth token')
    }
    return $session
  }

  onMount(() => {
    $token = document.cookie

    // get org name from subdomain
    const tld = window.location.hostname.split('.')[0]
    $org = (tld === 'discours' || tld === 'localhost') ? 'discours.io' : tld
    title = getPageTitle({ org: $org, shout })
    console.log('app: got org from domain name')
    console.log($org)
  })
/*
  $: if (checkAuth($token)) {
    console.log('app: authorize api connection')
    const al = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers }) => ({
        headers: {
          Auth: $token,
          ...headers,
        },
      }))
      return forward(operation)
    })
    console.log('app: apollo link created')
    if (client.link != al) {
      client.setLink(al)
      console.log('app: api connection renewed')
    }
  }
  */
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<header><NavHeader /></header>
<main>
  <Matcher>
    <Match path={$route.path} pattern="/">
      <Home />
    </Match>
    <Match path={$route.path} pattern="/search">
      <Search />
    </Match>
    <Match path={$route.path} pattern="/c/:category" let:params={{ category }}>
      <Search {category} />
    </Match>
    <Match path={$route.path} pattern="/create" loose>
      <Create />
    </Match>
    <Match path={$route.path} pattern="/a/:shout" let:params={{ shout }}>
      <Shout {shout} {org} />
    </Match>
    <Match
      path={$route.path}
      pattern="/a/:project/:shout"
      let:params={{ shout, project }}
    >
      <Shout {shout} {project} {org} />
    </Match>
    <Match path={$route.path} pattern="/forum" loose>
      <Forum />
    </Match>
    {#if $token}
      <Match path={$route.path} pattern="/feed">
        <Feed />
      </Match>
      <Match path={$route.path} pattern="/inbox">
        <Inbox />
      </Match>
      <Match path={$route.path} pattern="/editor">
        <Editor />
      </Match>
      <Match path={$route.path} pattern="/community">
        <Community />
      </Match>
    {:else}
      <Match path={$route.path} pattern="/login">
        <Login />
      </Match>
    {/if}
    <Match path={$route.path}>
      <NotFound />
    </Match>
  </Matcher>
</main>

<style lang="scss" global>
  @import 'styles/init.scss';
</style>
