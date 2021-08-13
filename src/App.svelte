<script>
  import { onMount } from 'svelte'
  import { ApolloLink } from '@apollo/client'
  import { Router, Route } from 'svelte-routing'
  import { setClient } from 'svelte-apollo'
  import client from './graphql/client.ts'
  import { GET_ME } from './graphql/queries'
  import { initLocalizationContext } from './i18n/index'
  import { token, session } from './stores/auth'
  import { getPageTitle } from './lib/common'
  import { org, lang } from './stores/common'

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
  import { shouts } from './stores/zine'
  import shoutsData from '../public/shouts.json'

  export let shout = ''
  export let url = ''
  export let title = 'discours.io'

  setClient(client)
  initLocalizationContext()

  let noauth = false

  onMount(() => {
    // TODO: get system lang
    $shouts = shoutsData
    $token = document.cookie
    // get org name from subdomain
    const tld = window.location.hostname
    // console.log(tld)
    $org =
      tld.replace('discours', '') !== tld ||
      tld.replace('localhost', '') !== tld ||
      tld.replace('jsdom', '') !== tld
        ? 'discours.io'
        : window.location.hostname.replace('discours.io')
    console.log($org)
    title = getPageTitle({ org: $org, shout })
    console.log('app: got org from domain name')
  })

  $: if ($token) {
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
    console.log('app: auth token found, trying to restore a session')
    console.debug(token)
    $session = getSession(token)
  }

  $: if (!$token && noauth === false) {
    noauth = true
    console.log('\napp: no auth token')
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
