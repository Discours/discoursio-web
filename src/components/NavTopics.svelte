<script>
  import { shouts } from '../stores/zine'

  let topics = new Set()

  $: if ($shouts) {
    const keys = Object.keys($shouts)
    keys &&
      keys.forEach((sid) => {
        if ($shouts[sid] && $shouts[sid].topics) {
          $shouts[sid].topics.forEach((topic) => topics.add(topic))
        }
      })
    // console.log(topics)
  }
</script>

<section>
  <div style="height: 60px;" />
  <div class="topics">
    {#if shouts}
      {#each Array.from(topics) as topic}
        <a href={'/search/?t=' + topic}>{topic}</a>
        <div class="space" />
      {/each}
    {/if}
  </div>
</section>

<style>
  section {
    min-width: 100%;
    max-width: 1080px;
    height: 60px;
    left: 0;
    top: 0;
  }

  .space {
    width: 29px;
  }

  .topics {
    height: 20px;
    left: 30px;
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    z-index: 9;
  }

  a,
  a:hover,
  a:link,
  a:visited {
    text-decoration: none;
    /*font-size: 2vh;*/
    font-weight: 500;
    line-height: 20px;
    color: black;
  }
</style>
