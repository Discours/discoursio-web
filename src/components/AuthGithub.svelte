<script>
    import Icon from './Icon.svelte'
    import { onMount } from 'svelte'

    export let clientId
    export let text = ''
    let redirectUrl

    onMount(() => {
        redirectUrl = window.location.hostname + '/reset'
    })
  </script>
  
  <a class="github-auth" href={'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUrl}>
    <Icon name="github" /><span>{text}</span>
  </a>
  
  <style>
    .github-auth {
      width: 100%;
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  
    .github-auth span {
      font-family: Roboto, sans-serif;
      font-size: 14px;
      font-weight: bold;
    }
  </style>
  