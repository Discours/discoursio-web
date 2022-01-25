<script lang="ts">
  import type { Shout, Topic } from '$lib/codegen'
  import DiscoursIcon from './DiscoursIcon.svelte'
  import ShoutCard from './ShoutCard.svelte'

  export let topic: Topic
  export let shouts: Shout[]
</script>

<div class="floor floor--important floor--group">
  <div class="wide-container row">
    <div class="group__header col-12">
      <div class="row">
        <h3 class="col-sm-6">
          {topic.title}
        </h3>
        <div class="col-sm-6 all-materials">
          <a href={`/topic/${topic.slug}`}
            >все материалы
            <DiscoursIcon name="arrow-right-white" />
          </a>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <ShoutCard shout={shouts[0]} />
    </div>
    <div class="col-lg-6">
      <div class="row">
        <div class="col-md-6">
          {#each shouts.slice(1, 4) as shout}
            <ShoutCard {shout} noimage={true} />
          {/each}
        </div>
        <div class="col-md-6">
          {#each shouts.slice(4, 7) as shout}
            <ShoutCard {shout} noimage={true} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .floor--group {
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

    .group__header .row {
      align-items: baseline;
    }
  }
</style>
