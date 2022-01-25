<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from './DiscoursIcon.svelte'
  import Userpic from './Userpic.svelte'
  import { client } from '$lib/client'
  import { GET_ME, GET_ROLES } from '$lib/queries'
  import { session, token, roles, notices } from '../stores/user'
  import { showNotices } from '../stores/app'
  import { messageslist } from '../stores/inbox'

  // const { t } = getLocalization()

  let res = ''
  let newMessages = 0 // FIXME: get with query
  let newNotices = 0

  onMount(() => {
    res = window.location.pathname
    console.log('navauth: mounting on ' + res)
  })

  $: if ($token) {
    try {
      console.log('navauth: found auth token ' + $token)
      client.request(GET_ME).then(({ user, error }) => {
        if (error) {
          $notices = [
            { text: error, type: 'error', ts: new Date(), state: 'new' },
            ...$notices
          ]
          console.log('navauth: update notices with no token error')
          console.debug($notices)
        }
        if (user) {
          console.log('navauth: got own session')
          $session = user
          client.request(GET_ROLES, { slug: user.slug }).then(async (data) => {
            console.log(data)
            if (data) {
              $roles = data
              console.log('navauth: my roles store updated')
            }
          })
          console.log('navauth: session store updated')
        }
      })
    } catch (e) {
      console.error(e)
      $notices = [
        { text: e, type: 'error', ts: new Date(), state: 'new' },
        ...$notices
      ]
      console.log('navauth: update notices with graphql error')
      console.debug($notices)
    }
  }

  $: if ($messageslist && $messageslist.length > 0) {
    newMessages = $messageslist.length
    console.log(`navauth: ${newMessages} new messages`)
  }
  $: if ($notices && $notices.length > 0)
    newNotices = $notices.filter((n) => !n.state).length
</script>

{#if $token}
  <div class="usercontrol col">
    <div class="usercontrol__item usercontrol__item--write-post">
      <a href="/create">
        <span class="text-label">опубликовать материал</span>
        <Icon name="pencil" />
      </a>
    </div>
    <div class="usercontrol__item usercontrol__item--search">
      <a href="/search">
        <Icon name="search" />
      </a>
    </div>
    <div class="usercontrol__item usercontrol__item--inbox">
      <a href="/user/inbox">
        <div class:entered={res === '/user/inbox'}>
          <Icon name="inbox-white" counter={newMessages} />
        </div>
      </a>
    </div>
    <div class="usercontrol__item">
      <a
        href={''}
        on:click|preventDefault={() => ($showNotices = !$showNotices)}
      >
        <div>
          <Icon name="bell-white" counter={newNotices} />
        </div>
      </a>
    </div>
    <div class="usercontrol__item">
      <a href="/user">
        <div class:entered={res === '/user'}>
          <Userpic user={$session} />
        </div>
      </a>
    </div>
  </div>
{/if}

<style lang="scss">
  .usercontrol {
    align-items: baseline;
    display: flex;
    @include font-size(1.7rem);
    justify-content: flex-end;

    @include media-breakpoint-down(md) {
      padding: divide($container-padding-x, 2);
    }

    :global(.circlewrap) {
      margin-right: 0;
    }
  }

  .usercontrol__item {
    margin-left: divide($container-padding-x, 2);

    @include media-breakpoint-up(sm) {
      margin-left: 3.2rem;
    }

    :global(.circlewrap) {
      height: 23px;
      min-width: 23px;
      width: 23px;
    }

    :global(img) {
      height: 20px;
      vertical-align: middle;
      width: auto;
    }

    .text-label {
      display: none;
    }
  }

  .usercontrol__item--write-post {
    @include media-breakpoint-up(lg) {
      :global(.icon) {
        display: none;
      }

      .text-label {
        display: inline;
      }
    }
  }

  .usercontrol__item--inbox,
  .usercontrol__item--search {
    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  a {
    color: #000;

    &:hover {
      color: #000;
    }
  }
</style>
