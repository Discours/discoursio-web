<script>
  import { onMount } from 'svelte'
  import { path, click } from 'svelte-pathfinder'
  import { initLocalizationContext } from './i18n'
  import { pages } from './stores/router'
  import { token } from './stores/auth'
  import NavHeader from './components/NavHeader.svelte'
  import Home from './pages/Home.svelte'
  import NotFound from './pages/NotFound.svelte'
  import Forum from './pages/Forum.svelte'
  import Community from './pages/Community.svelte'
  import Feed from './pages/Feed.svelte'
  import Create from './pages/Create.svelte'
  import Search from './pages/Search.svelte'
  import Login from './pages/Login.svelte'
  import Inbox from './pages/Inbox.svelte'
  import Shout from './pages/Shout.svelte'

  initLocalizationContext()
  let component
  let props = {}
  $: component =
    $pages[$path] && $pages[$path].public
      ? $pages[$path].component
      : ($token ? $pages[$path].component : Login) || NotFound
  onMount(() => {
    $token = document.cookie
    $pages = {
      '/': { component: Home, caption: 'zine', public: true },
      '/feed': { component: Feed, caption: 'feed', public: true },
      '/search': { component: Search, caption: 'search', public: true },
      '/login': { component: Login, caption: 'login', public: true },
      '/a/:id': { component: Shout, public: true },
      '/create': { component: Create, caption: 'create' },
      '/inbox': { component: Inbox, caption: 'inbox' },
      '/community': { component: Community, caption: 'community' },
      '/forum': { component: Forum, caption: 'forum' },
    }
    console.log('started!')
  })
</script>

<svelte:window on:click={click} />
<header><NavHeader /></header>
<main><svelte:component this={component} {...props} /></main>

<style lang="scss" global>
  @import 'styles/init.scss';
</style>
