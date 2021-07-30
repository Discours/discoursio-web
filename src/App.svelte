<script>
  import { onMount } from 'svelte'
  import { ApolloLink } from '@apollo/client'
  import { Router, Route } from 'svelte-routing'

  // import { Query } from './graphql/codegen'
  import { client } from './graphql/client.ts'
  import { initLocalizationContext } from './i18n/index'
  import { token, session } from './stores/auth'
  import { getPageTitle } from './lib/common'
  import { org } from './stores/common'

  import NavHeader from './components/NavHeader.svelte'
  import Home from './pages/Home.svelte'
  import NotFound from './pages/NotFound.svelte'
  import Forum from './pages/Forum.svelte'
  import Community from './pages/Community.svelte'
  import Editor from './components/Editor.svelte'
  import Feed from './pages/Feed.svelte'
  // import Create from './pages/Create.svelte'
  import Search from './pages/Search.svelte'
  import Login from './pages/Login.svelte'
  import Inbox from './pages/Inbox.svelte'
  import Shout from './pages/Shout.svelte'
  import Reset from './pages/Reset.svelte'

  export let shout = ''
  export let url = ''
  export let title = 'discours.io'

  initLocalizationContext()

  const checkAuth = (token) => {
    if (token) {
      console.log('app: auth token found, trying to restore session')
      console.debug(token)
      // TODO: $session = Query.getCurrentUser()
    } else {
      console.log('app: no auth token')
      // TODO: set inbox new message icon
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
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<header><NavHeader /></header>
<main>
  <Router {url}>
    <Route path="/" component={Home} />
    <Route path="search" component={Search} />
    <Route path="a/:shout" let:params>
      <Shout shout={params.shout} {org} />
    </Route>
    <Route path="forum" component={Forum} />
    <Route path="resetpassword" component={Reset} />
    <Route path="resetpassword/:token" component={Reset} let:params />
    {#if $token}
      <Route path="feed" component={Feed} />
      <Route path="inbox" component={Inbox} />
      <Route path="edit" component={Editor} />
      <Route path="community" component={Community} />
    {:else}
      <Route path="login" component={Login} />
    {/if}
    <Route path="*" component={NotFound} />
  </Router>
</main>

<style lang="scss" global>
  @import 'styles/init.scss';
</style>
