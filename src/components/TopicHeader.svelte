<script lang="ts">
import type { Topic } from "$lib/codegen"
import DiscoursIcon from "./DiscoursIcon.svelte"
export let topic: Topic
</script>
<header>
    <h3 class="col-sm-6">{topic.title}</h3>
    <div class="col-sm-6 all-materials">
        <a href={`/topic/${topic.slug}`}
            >все материалы
            <DiscoursIcon name="arrow-right-white" />
        </a>
    </div>
</header>
<style lang="scss">
.all-materials {
    align-self: baseline;
    margin-bottom: 1em;
    white-space: nowrap;

    @include media-breakpoint-up(sm) {
    text-align: right;
    }

    :global(.icon) {
    display: inline-block;
    height: 0.8em;
    vertical-align: middle;
    width: 0.8em;
    }

    :global(img) {
    vertical-align: top;
    }
}
</style>