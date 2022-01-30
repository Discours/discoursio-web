<script lang="ts" context="module">
    import type { PageMeta } from '@vitebook/client'
    import Auth from '../../components/Auth.svelte'
  
    export const __pageMeta: PageMeta = {
      title: 'Auth',
      description: 'модуль авторизации',
    }
  </script>
  
  <script>
    import { Variant } from '@vitebook/client';
    import {
      ControlsAddon,
      EventsAddon,
      eventCallback,
    } from '@vitebook/client/addons'
    
    let mode = 'login'
    $: chLogin = mode === 'login'
    $: chReset = mode === 'reset'
    $: chRegister = mode === 'register'
    $: chForgot = mode === 'forgot'
  </script>
  
  <Variant name="Логин" description="Авторизация" on:enter={() => mode = 'login'}>
    <Auth {mode} />
  </Variant>
  <Variant name="Регистрация" description="Создание аккаунта" on:enter={() => mode = 'register'}>
    <Auth {mode} />
  </Variant>
  <Variant name="Забыл пароль" description="Отправка подтверждения" on:enter={() => mode = 'forgot'}>
    <Auth {mode} />
  </Variant>
  <Variant name="Сброс пароля" description="Применение кода подтверждения" on:enter={() => mode = 'reset'}>
    <Auth {mode} />
  </Variant>
  
  <ControlsAddon>
    {#key mode}
        <label style="margin-top: 24px;">
            Логин <input type="checkbox" bind:checked={chLogin} />
        </label>
        <label>
            Регистрация <input type="checkbox" bind:checked={chRegister} />
        </label>
        <label>
            Забыл <input type="checkbox" bind:checked={chForgot} />
        </label>
        <label>
            Сброс пароля <input type="checkbox" bind:checked={chReset} />
        </label>
    {/key}
  </ControlsAddon>
  
  <EventsAddon />
  