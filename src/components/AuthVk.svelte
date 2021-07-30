<div on:click={login} {disabled} id="vk-auth">
  <div id="vk_api_transport"></div>
  <img src="vk-square.svg" alt="vk" /><span>{text}</span>
</div>
  
  <style>
    div {
      width: 100%;
      border: 0; margin: 0; padding: 0;
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
  
  <script>
    import { onMount, createEventDispatcher } from 'svelte'
    import loader from '@beyonk/async-script-loader'
    const dispatch = createEventDispatcher()
  
    let disabled = true
    export let apiId
    export let authUrl
    export let width
    export let text = ''
  
    onMount(() => {
      apiId && loader(
        [{ type:'script', url: '//vk.com/js/api/openapi.js?169' }],
        () => window['VK'],
        () => initialise()
      )
    })
  
    function initialise () {
      console.log('auth: vk async init')
      const VK = window['VK']
      apiId && VK.init({ apiId })
      disabled = false
    }
  
    function login () {
      const VK = window['VK']
      VK.Widgets.Auth('vk-auth', { 
        onAuth: (res) => {
          const { uid, first_name, last_name, photo, photo_rec, hash } = res
          if(uid) {
            /* docs.vk.com: Для проверки авторизации Вы можете 
            использовать полученный параметр hash, сравнив его 
            с md5 подписью от app_id+user_id+secret_key, 
            например md5(667481942537fTanpCrNSeuGPbA4ENCo). */
            dispatch('auth-success', {
              userId: uid, 
              accessToken: hash, 
              name: first_name + ' ' + last_name
            })
          } else dispatch('auth-info', { res })
        }, 
        authUrl, 
        width })
    }
  </script>
  