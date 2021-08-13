<script lang="ts">
  import MD from 'marked'

  export let shout
  // TODO: ShoutCard layout, logix
</script>

<div class="shout">
  {#if shout.body}
  <div class="shout-body">
    {@html MD(shout.body)}
  </div>
  {/if}
  <div class="shout-controls">
    <div class="shout-author">{shout && shout.author || 'anonymous'}</div>
    <div class="shout-rating">+22</div>
  </div>
</div>

<style>
  .shout-body {
    font-family: Georgia;
    font-size: 2h;
    padding: 3vw;
  }
  .shout-author, .shout-rating {
    display: flex;
    float: right;
    width: 30vw;
    height: 3vh;
    font-size: 2vh;
  }
</style>
