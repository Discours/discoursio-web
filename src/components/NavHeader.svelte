<script lang="ts">
import { route } from '../stores/router'

import UserAvatar20 from 'carbon-icons-svelte/lib/UserAvatar20'
import UserAvatarFilledAlt20 from 'carbon-icons-svelte/lib/UserAvatarFilledAlt20'
import UserAvatarFilled20 from 'carbon-icons-svelte/lib/UserAvatarFilled20'
import Edit20 from 'carbon-icons-svelte/lib/Edit20'
import Search20 from 'carbon-icons-svelte/lib/Search20'
import Query20 from 'carbon-icons-svelte/lib/Query20'
import Email20 from 'carbon-icons-svelte/lib/Email20'
import Dashboard20 from 'carbon-icons-svelte/lib/Dashboard20'
import EditOff20 from 'carbon-icons-svelte/lib/EditOff20'
import EmailNew20 from 'carbon-icons-svelte/lib/EmailNew20'
import MailAll20 from 'carbon-icons-svelte/lib/MailAll20'
import Userpic from './Userpic.svelte'
import { token } from '../stores/auth'

//import { getLocalization } from '../i18n'
// const { t } = getLocalization()

let newMessages = true // FIXME

$: console.log($route)

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<nav>
  <a on:click={() => $route.path = '/'}><h1>Дискурc</h1></a>
  <div style="width: 195px;" />
  <div class="router">

    <!-- public routes -->
    <div class="routewrap">
      <div class="routecell">
        <a on:click={() => $route.path = '/search'} >
          <svelte:component this={ $route.path==='/search'? Query20 : Search20} title='search' />
        </a>
      </div>
    </div>
    <div style="width: 4vw;" />

    <div class="routewrap">
      <div class="routecell">
        <a on:click={() => $route.path = '/login'} >
          <svelte:component this={$route.path==='/login'? UserAvatarFilledAlt20 : UserAvatar20 } title='login' />
        </a>
      </div>
    </div>
    <div style="width: 4vw;" />

    {#if $token}
      <!-- private routes -->
      <div class="routewrap">
        <div class="routecell">
          <a on:click={() => $route.path = '/profile'} >
            <svelte:component this={$route.path==='/profile'? Userpic : UserAvatarFilled20} title='profile' />
          </a>
        </div>
      </div>
      <div style="width: 4vw;" />

      <div class="routewrap">
        <div class="routecell">
          <a on:click={() => $route.path = '/editor'} >
            <svelte:component this={$route.path==='/editor'? Edit20 : EditOff20} title='editor' />
          </a>
        </div>
      </div>
      <div style="width: 4vw;" />

      <div class="routewrap">
        <div class="routecell">
          <a on:click={() => $route.path = '/inbox'} >
            <svelte:component this={$route.path==='/inbox'? (newMessages?EmailNew20:Email20) : MailAll20 } title='inbox' />
          </a>
        </div>
      </div>
      <div style="width: 4vw;" />

      <div class="routewrap">
        <div class="routecell">
          <a on:click={() => $route.path = '/community'} >
            <svelte:component this={Dashboard20} title='community' />
          </a>
        </div>
      </div>
      <div style="width: 4vw;" />
    {/if}
    
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

    .router {
      height: 28px;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;

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

          a {
            font-size: 15px;
            font-weight: 500;
            line-height: 22px;
            color: white;
          }

        }
      }
    }
  }
</style>
