<div on:click={login} {disabled} class="facebook-auth">
  <LogoFacebook32 /><span>{text}</span>
</div>

<style>
  .facebook-auth {
    width: 100%;
    border: 0; margin: 0; padding: 0;
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

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import loader from '@beyonk/async-script-loader'
  import LogoFacebook32 from 'carbon-icons-svelte/lib/LogoFacebook32'
  const dispatch = createEventDispatcher()

  const version = 'v3.2'

  let disabled = true
  export let appId
  export let text = ''

  onMount(() => {
    appId && loader(
      [{ type:'script', url: '//connect.facebook.net/ru_RU/sdk.js' }],
      () => window['FB'],
      () => initialise()
    )
  })

  function initialise () {
    const FB = window['FB']
    FB.init({
      appId      : appId,
      cookie     : true,
      xfbml      : false,
      version    : version
    })
    disabled = false
  }

  function login () {
    const FB = window['FB']
    FB.login(function (response) {
      if (response.status === 'connected') {
        const authResponse = response.authResponse
        const userId = authResponse.userID
        const accessToken = authResponse.accessToken

        dispatch('auth-success', {
          accessToken,
          userId
        })
      } else {
        dispatch('auth-info', { response })
      }
    }, { scope: 'email,public_profile' })
  }
</script>
