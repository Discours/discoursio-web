<script context="module" lang="ts">
  import type { Shout, Comment, Topic } from '../graphql/codegen'
  // import type { Page } from '@sveltejs/kit'

  interface WhatProps {
    data: Shout | Partial<Shout> | Topic | Partial<Topic>
    comments?: Comment[]
    what: string
  }

  export async function load({ page, fetch }): Promise<{ props: WhatProps }> {
    const { what } = page.params
    const data = await fetch(`/${what}.json`).then((r) => r.json())
    return {
      props: { data, what },
    }
  }
</script>

<script lang="ts">
  import { shouts, topics } from '../stores/zine'
  import TopicView from '../components/Topic.svelte'
  // import { page } from '$app/stores'

  export let props: WhatProps

  let data: Shout | Topic | Partial<Topic> | Partial<Shout>
  let what = ''

  $: if ($shouts && $topics && props?.what) {
    what = props?.what
    data = <Topic>$topics[what]
    if (!data) data = <Shout>$shouts[what]
  }
</script>

<svelte:head><title>Дискурс : {data.title}</title></svelte:head>
{#if data.body}
  <div>{@html data.body}</div>
{:else}
  <TopicView topic={what} />
{/if}
