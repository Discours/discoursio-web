<script lang="ts">
import Auth from '../../components/Auth.svelte'
import { page } from '$app/stores'
import { goto } from '$app/navigation'
</script>
    
<svelte:head><title>Дискурс : Сброс пароля</title></svelte:head>

<div class="resetpage">
    <Auth mode={'reset'} code={$page.params.code} on:close={() => goto('/')} />
</div>

<style>
    .resetpage {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        background: white;
        display: flex;
        align-content: space-around;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>