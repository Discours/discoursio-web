<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import loader from '../lib/asyncloader'
  import { VK_APP_ID } from '../stores/auth'

  const dispatch = createEventDispatcher()

  let disabled = true
  export let authUrl = null
  export let width = 32
  export let text = ''
  let VK

  onMount(() => {
    loader(
      [{ type: 'script', url: '//vk.com/js/api/openapi.js?169' }],
      () => {
        VK = window['VK']
        return VK
      },
      () => initialise()
    )
  })

  function initialise() {
    console.log('auth: vk async init')
    VK = window['VK']
    VK.init({ apiId: VK_APP_ID })
    disabled = false
  }

  function login() {
    VK = window['VK']
    VK.Widgets.Auth('vk-auth', {
      onAuth: (res) => {
        const { uid, first_name, last_name, hash } = res
        if (uid) {
          /* docs.vk.com: Для проверки авторизации Вы можете 
            использовать полученный параметр hash, сравнив его 
            с md5 подписью от app_id+user_id+secret_key, 
            например md5(667481942537fTanpCrNSeuGPbA4ENCo). */
          dispatch('auth-success', {
            userId: uid,
            accessToken: hash,
            name: first_name + ' ' + last_name,
          })
        } else dispatch('auth-info', { res })
      },
      authUrl,
      width,
    })
  }
</script>

<div on:click={login} {disabled} id="vk-auth">
  <div id="vk_api_transport" />
  <img src="/icons/vk-square.svg" alt="vk" /><span>{text}</span>
</div>

<style>
  div {
    width: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  div img {
    max-width: 25px;
    margin-right: 40px;
  }
  div span {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: bold;
  }
</style>
