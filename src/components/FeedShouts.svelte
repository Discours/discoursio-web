<script lang="ts">
    import type { Shout } from '../lib/codegen'
    import ShoutCard from './ShoutCard.svelte'
    
    export let shouts: Shout[]
</script>

<div class="feed-shouts">
    {#each shouts as shout}
        <ShoutCard {shout} />
    {/each}
</div>