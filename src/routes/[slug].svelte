<script lang="ts" context="module">
  import type { Shout } from '../graphql/codegen'
  import type { Load } from '@sveltejs/kit'
  import { browser } from '$app/env'

  interface WhatProps {
    shout?: Shout | Partial<Shout>
    slug: string
  }

  export const load: Load = async ({
    page,
    fetch,
    session,
    stuff,
  }): Promise<{ props: WhatProps | Partial<WhatProps> }> => {
    if (browser) {
      console.log('--------- - - - - -- - - - -- - -- - ---')
      return { props: page.params }
    } else {
      const { slug } = page.params
      const r = await fetch(`/data/${slug}.json`)
      const shout = await r.json()
      return { props: { shout, slug } }
    }
  }
</script>

<script lang="ts">
  import type { Topic } from '../graphql/codegen'
  import { shouts, topics } from '../stores/zine'
  import TopicView from '../components/Topic.svelte'
  import { page } from '$app/stores'
  import MD from 'markdown-it'
  // import hl from 'markdown-it-highlight'
  import mdanch from 'markdown-it-anchor'
  import mark from 'markdown-it-mark'
  import implicit from 'markdown-it-implicit-figures'
  import mdcustom from 'markdown-it-container'
  import 'markdown-it-highlight/dist/index.css'

  const mit = MD()
  mit.use(mdanch)
  // mit.use(hl)
  mit.use(mark)
  mit.use(mdcustom)

  mit.use(implicit, {
    dataType: false, // <figure data-type="image">
    figcaption: true, // <figcaption>alternative text</figcaption>
  })

  export let props: WhatProps
  let shout: Shout | Partial<Shout>
  let topic: Topic | Partial<Topic>
  let slug: string = ''

  $: if ($shouts && $topics && $page.params.slug) {
    slug = $page.params.slug
    topic = <Topic>$topics[slug]
    if (!topic) shout = (props && props.shout) || <Shout>$shouts[slug]
  }
</script>

<svelte:head><title>Дискурс : {shout ? shout.title : ''}</title></svelte:head>

{#if shout && shout.body}
  <div>
    <h2>{shout.title}</h2>
    {#if shout.subtitle}<h4>{shout.subtitle}</h4>{/if}
    <div
      class="shout-cover"
      style={`background-image: url('${shout.cover}')`}
    />
    <div class="shout-body">
      {@html mit.render(shout.body)}
    </div>
  </div>
{:else}
  <TopicView {topic} />
{/if}

<style lang="scss">
  h2 {
    background-color: transparent;
    color: grey;
    text-shadow: 1px 1px black;
    opacity: 0.8;
    padding: 2rem;
  }

  :global(img) {
    width: 80%;
  }

  mark {
  }

  .shout-cover {
    position: fixed;
    background-size: cover;
    display: flex;
    height: 26rem;
  }
</style>
