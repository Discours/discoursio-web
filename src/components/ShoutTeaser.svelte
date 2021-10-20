<script lang="ts">
  import MD from 'markdown-it'

  const mit = new MD()
  const { parse } = mit

  export let shout
  // TODO: ShoutCard layout, logix
</script>

<div class="shout">
  {#if shout.body}
    <div class="shout-body">
      {@html shout.body}
    </div>
  {/if}
  <div class="shout-controls">
    <div class="shout-author">{(shout && shout.author) || 'anonymous'}</div>
    <div class="shout-rating">+22</div>
  </div>
</div>

<style>
  /*
  .shout {
    border-bottom: 1px solid black;
    padding-bottom: 2vh;
    min-height: 12vh;
  }
*/
  /*
  .shout-body {
    font-family: var(--font);
    font-size: 2vh;
    padding: 3vw;
  }
*/
  .shout-author,
  .shout-rating {
    margin-top: -1vh;
    margin-right: 2vw;
    float: right;
    min-width: 3vw;
    line-height: 3vh;
    /*font-size: 2vh;*/
    border-radius: 15px;
    padding: 0.5vw;
    color: white;
    background-color: black;
  }
</style>
