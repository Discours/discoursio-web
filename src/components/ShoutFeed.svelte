<script lang="ts">
import type { Shout } from '$lib/codegen'
import ShoutCard from './ShoutCard.svelte'
export let shouts: Shout[]
</script>
<section class="feed">
    <div class="floor floor--3">
        <div class="wide-container row">
            {#each shouts.slice(0, 3) as shout}
                <div class="col-md-4">
                    <ShoutCard {shout} />
                </div>
            {/each}
        </div>
    </div>

    <div class="floor floor--2">
        <div class="wide-container row">
                {#each shouts.slice(3, 5) as shout}
                    <div class="col-md-6">
                        <ShoutCard {shout} />
                    </div>
                {/each}
        </div>
    </div>

    <div class="floor floor--31">
        <div class="wide-container row">
            <div class="col-md-4">
                {#each shouts.slice(5, 9) as shout}
                    <ShoutCard noimage={true} {shout} />
                {/each}
            </div>
            <div class="col-md-8">
                <ShoutCard shout={shouts[9]} />
            </div>
    </div>

    <div class="floor floor--1">
        <div class="wide-container row">
            <div class="col-md-12">
                <ShoutCard shout={shouts[10]} />
            </div>
        </div>
    </div>
</section>