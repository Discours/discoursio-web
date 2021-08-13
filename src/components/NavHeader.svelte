<script>
import { links } from 'svelte-routing'

import UserAvatar20 from 'carbon-icons-svelte/lib/UserAvatar20'
import UserAvatarFilledAlt20 from 'carbon-icons-svelte/lib/UserAvatarFilledAlt20'
import UserAvatarFilled20 from 'carbon-icons-svelte/lib/UserAvatarFilled20'
import Edit20 from 'carbon-icons-svelte/lib/Edit20'
import Search20 from 'carbon-icons-svelte/lib/Search20'
import Query20 from 'carbon-icons-svelte/lib/Query20'
import Email20 from 'carbon-icons-svelte/lib/Email20'
import Dashboard20 from 'carbon-icons-svelte/lib/Dashboard20'
import DashboardReference20 from 'carbon-icons-svelte/lib/DashboardReference20'
import EditOff20 from 'carbon-icons-svelte/lib/EditOff20'
import EmailNew20 from 'carbon-icons-svelte/lib/EmailNew20'
import MailAll20 from 'carbon-icons-svelte/lib/MailAll20'
import Userpic from './Userpic.svelte'

import { token } from '../stores/auth'

import { getLocalization } from '../i18n'
const { t } = getLocalization()

let newMessages = true // FIXME: get with query

const here = where => window && window.location === where
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<nav use:links>
  <a href='/'><h1>Дискурc</h1></a>
  <div style="width: 195px;" />
  <div class="router">

    <!-- public routes -->
    <div class="routerow">
      <div class="routecell">
        <a href='/search' >
          <svelte:component this={ here('/search')? Query20 : Search20} title={$t('Search')} />
        </a>
      </div>
    </div>

    <div class="routerow">
      <div class="routecell">
        <a href='/login' >
          <svelte:component this={ here('/login')? UserAvatarFilledAlt20 : UserAvatar20 } title={$t('Edit')} />
        </a>
      </div>
    </div>

    {#if $token}
      <!-- private routes -->
      <div class="routerow">
        <div class="routecell">
          <a href='/profile' >
            <svelte:component this={ here('/profile')? Userpic : UserAvatarFilled20} title='profile' />
          </a>
        </div>
      </div>

      <div class="routerow">
        <div class="routecell">
          <a href='/editor' >
            <svelte:component this={ here('/editor')? Edit20 : EditOff20} title='editor' />
          </a>
        </div>
      </div>

      <div class="routerow">
        <div class="routecell">
          <a href='/inbox'>
            <svelte:component this={ here('/inbox')? (newMessages?EmailNew20:Email20) : MailAll20 } title='inbox' />
          </a>
        </div>
      </div>

      <div class="routerow">
        <div class="routecell">
          <a href='/community' >
            <svelte:component this={here('/inbox')? DashboardReference20:Dashboard20} title='community' />
          </a>
        </div>
      </div>
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

      .routerow {
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
