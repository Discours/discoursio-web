<script>
  import Icon from './Icon.svelte'
  import { onMount, createEventDispatcher } from 'svelte'
  import loader from '../lib/asyncloader'
  const dispatch = createEventDispatcher()

  const version = 'v11.0'

  let disabled = true
  export let appId
  export let text = ''
  let FB

  onMount(() => {
    appId &&
      loader(
        [{ type: 'script', url: '//connect.facebook.net/ru_RU/sdk.js' }],
        () => {
          FB = window['FB']
          return FB
        },
        () => initialise()
      )
  })

  function initialise() {
    console.log('auth: fb async init')
    FB.init({
      appId,
      cookie: true,
      xfbml: false,
      version,
    })
    disabled = false
  }

  function login() {
    FB.login(
      function (response) {
        if (response.status === 'connected') {
          const authResponse = response.authResponse
          const userId = authResponse.userID
          const accessToken = authResponse.accessToken

          dispatch('auth-success', {
            accessToken,
            userId,
          })
        } else {
          dispatch('auth-info', { response })
        }
      },
      { scope: 'email,public_profile' }
    )
  }
</script>

<div on:click={login} {disabled} class="facebook-auth">
  <Icon name="facebook" /><span>{text}</span>
</div>

<style>
  .facebook-auth {
    width: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .facebook-auth span {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: bold;
  }
</style>
