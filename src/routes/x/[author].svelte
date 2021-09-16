<script lang="ts" context="module">
  import type { User } from '../../graphql/codegen'

  interface AuthorProps {
    user: User | Partial<User>
  }

  export async function load({ page, fetch }): Promise<{ props: AuthorProps }> {
    const { author } = page.params
    const user: User | Partial<User> = await fetch(`/x/${author}.json`).then(
      (r: Response): Promise<string> => r.json()
    )
    return {
      props: { user },
    }
  }
</script>

<script lang="ts">
  import Author from '../../components/Author.svelte'
  export let props: { user: User | Partial<User> }
</script>

<svelte:head>
  <title>Дискурс : {props.user ? props.user.viewname : 'Автор'}</title>
</svelte:head>
{#if props.user}<Author author={props.user} />{/if}
