<script lang="ts">
  import { route } from '../stores/router'
  import { getLocalization } from '../i18n'

  import Login20 from 'carbon-icons-svelte/lib/Login20'
  import Edit20 from 'carbon-icons-svelte/lib/Edit20'
  import Search20 from 'carbon-icons-svelte/lib/Search20'
  import Email20 from 'carbon-icons-svelte/lib/Email20'
  import Dashboard20 from 'carbon-icons-svelte/lib/Dashboard20'
  import Collaborate20 from 'carbon-icons-svelte/lib/Collaborate20'

  import Userpic from './Userpic.svelte'
  import { token } from '../stores/auth'

  const { t } = getLocalization()

  const publicRoutes = [
    { path: '/', caption: 'home' },
    { path: '/search', caption: 'search', icon: Search20 },
    { path: '/create', caption: 'create', icon: Edit20 },
    { path: '/login', caption: 'login', icon: Login20 },
  ]

  const privateRoutes = [
    { path: '/profile', caption: 'profile', icon: Userpic },
    { path: '/editor', caption: 'editor', icon: Collaborate20 },
    { path: '/inbox', caption: 'inbox', icon: Email20 },
    { parg: '/community', caption: 'community', icon: Dashboard20 },
  ]

  let visibleRoutes

  $: visibleRoutes = [...publicRoutes, ...($token && privateRoutes)]
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<nav>
  <h1>Дискурc</h1>
  <div style="width: 195px;" />
  <div class="route">
    {#each visibleRoutes as { path, caption, icon }}
      <div>
        <div class="routewrap">
          <div class="routecell">
            <a class:selected={path == $route.path} href={path}>
              <svelte:component this={icon} title={$t(caption)} />
            </a>
          </div>
        </div>
      </div>
      <div style="width: 4vw;" />
    {/each}
  </div>
</nav>

<style lang="scss">
  nav {
    width: 100%;
    height: 80px;
    background-color: rgba(20.4, 20.4, 20.4, 1);
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    h1 {
      width: 180px;
      height: 80px;
      padding: 8px 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 700;
      line-height: 44px;
      text-align: center;
      color: white;
      text-transform: uppercase;
    }

    .route {
      height: 28px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;

      .routewrap {
        display: inline-flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        padding-top: 2px;

        .routecell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          a {
            font-size: 15px;
            font-weight: 500;
            line-height: 22px;
            color: white;
          }

          .selected {
            border-bottom: 2px solid #fff;
            padding-bottom: 3px;
          }
        }
      }
    }
  }
</style>
