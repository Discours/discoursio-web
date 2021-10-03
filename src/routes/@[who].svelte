<script lang="ts" context="module">
  import type { User, Community } from '../graphql/codegen'

  interface WhoProps {
    data: User | Partial<User> | Community | Partial<Community>,
    who: string
  }

  export async function load({ page, fetch }): Promise<{ props: WhoProps }> {
    const { who } = page.params
    const data: User | Partial<User> | Community | Partial<Community>  = await fetch(`@${who}.json`).then(
      (r: Response): Promise<string> => r.json()
    )
    return {
      props: { data, who },
    }
  }
</script>

<script lang="ts">
  import Author from '../components/Author.svelte'
  import CommunityView from '../components/Community.svelte'
  import { communities, authors } from '../stores/zine'

  export let props: WhoProps
  let author: User | Partial<User>
  let community: Community | Partial<Community>
  let who = ''

  $: if ($communities && $authors && props?.who) {
    who = props?.who
    community = <Community>$communities[who]
    if (!community) author = <User>$authors[who]
  }
</script>

<svelte:head>
  <title>Дискурс : { props.data ? props.data.name : who }</title>
</svelte:head>

{#if props.data}
  <Author {author} />
{:else}
  <CommunityView slug={who} />
{/if}
