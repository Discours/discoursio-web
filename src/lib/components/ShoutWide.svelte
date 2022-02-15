<script lang="ts">
  import type { Shout } from '$lib/codegen'

  import ShoutCard from './ShoutCard.svelte'
  export let shout: Shout
</script>

<div class="floor floor--one-article">
  <div class="wide-container row">
    <div class="col-12">
      <ShoutCard {shout} />
    </div>
  </div>
</div>
