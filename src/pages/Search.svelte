<script lang="ts">
  import { onMount } from 'svelte'
  import { getShoutsFiltered } from '../graphql/queries'

  // TODO: topAuthors query

  export let category // as TAG
  let entries = []
  onMount(() => {
    entries = getShoutsFiltered({ category })
  })
</script>
