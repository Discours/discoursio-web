<script context="module" lang="ts">
  import type { Shout, Comment } from '../../graphql/codegen'
  // import type { Page } from '@sveltejs/kit'

  interface ShoutProps {
    shout: Shout
    comments?: Comment[]
    slug: string
  }

  export async function load({ page, fetch }): Promise<{ props: ShoutProps }> {
    const { slug } = page.params
    const shout = await fetch(`/a/${slug}.json`).then((r) => r.json())
    return {
      props: { shout, slug },
    }
  }
</script>

<script lang="ts">
  import { shouts } from '../../stores/zine'
  import { page } from '$app/stores'

  export let params: { slug: string }

  let data: Shout | Partial<Shout>
  let slug = ''

  $: if ($shouts && params?.slug) {
    slug = params?.slug
    data = <Shout>$shouts[slug]
  }
</script>

<svelte:head><title>Дискурс : {data.title}</title></svelte:head>
<div>{@html data.body}</div>
