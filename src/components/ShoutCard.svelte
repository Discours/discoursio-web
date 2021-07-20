<script lang="ts">
  import type { Shout } from '../graphql/codegen'

  export let shout

  // TODO:
</script>

<div class="shout">
  <div class="shout-header">
    <div class="shout-title">{shout.title}</div>
  </div>
  <div class="shout-body">
    <img alt="" src={shout.id} />
  </div>
  <div class="shout-controls">
    <div class="shout-author">{shout.author}</div>
    <div class="shout-rating" />
  </div>
</div>
