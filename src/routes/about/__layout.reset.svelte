<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import { page } from '$app/stores'

  import DiscoursFooter from '$lib/components/DiscoursFooter.svelte'
  import NavHeader from '$lib/components/NavHeader.svelte'

  const meta = {
    title: 'Дискурс',
    description: 'О проекте',
    keywords:
      'Discours.io, дискурс, самыздат, коллаборативная редакция, проекты, донаты, партнёры'
  }

  $: if ($page && $page.url) console.log('layout: got page store')
</script>

<SvelteSeo
  {...meta}
  openGraph={{
    ...meta,
    images: [{ url: 'https://new.discours.io/logo.png' }]
  }}
/>
<svelte:head>
  <link rel="shortcut icon" href="/favicon.png" />
</svelte:head>
<NavHeader />
{#key $page.url}
  <slot />
{/key}
<DiscoursFooter />
