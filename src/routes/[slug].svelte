<script lang="ts" context="module">
  import type { Shout } from '../graphql/codegen'
  import type { Load } from '@sveltejs/kit'
  import { browser } from '$app/env'

  interface WhatProps {
    shout?: Shout | Partial<Shout>,
    slug: string
  }

  export const load: Load = async ({ page, fetch, session, stuff }): Promise<{ props: WhatProps|Partial<WhatProps> }> => {
    if (browser) {
      return { props: page.params }
    } else {
      const { slug } = page.params
      const r = await fetch(`/data/${slug}.json`)
      return { props: { shout: await r.json(), slug }
    }
  }
}
</script>

<script lang="ts">
  import type { Topic } from '../graphql/codegen'
  import { shouts, topics } from '../stores/zine'
  import TopicView from '../components/Topic.svelte'
  
  export let props: WhatProps
  let shout: Shout | Partial<Shout>
  let topic: Topic | Partial<Topic>
  let slug: string = ''

  $: if ($shouts && $topics && props.slug) {
    slug = props.slug
    topic = <Topic>$topics[slug]
    if (!topic && props.shout) shout = props?.shout
    if (!topic) shout = <Shout>$shouts[slug]
  }
</script>

<svelte:head><title>Дискурс : {shout.title}</title></svelte:head>
{#if shout.body}
  <div>{@html shout.body}</div>
{:else}
  <TopicView {topic} />
{/if}
