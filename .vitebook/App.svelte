<script lang="ts">
  import './global.css'
  import type { SvelteComponent } from 'svelte'

  export let component: SvelteComponent
</script>

<svelte:component this={component} />
