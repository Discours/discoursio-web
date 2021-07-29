<script>
  import { onMount } from 'svelte'
  import { org, lang, Locale } from '../stores/common'
  import { shouts } from '../stores/zine'
  
  import shoutsDataEn from '../../public/shouts.en.json'
  import shoutsDataRu from '../../public/shouts.json'

  let topics = new Set() 
  
  onMount(() => {
    // TODO: get system lang
    $shouts = ($lang === Locale.RU? shoutsDataRu : shoutsDataEn)[$org]
    console.log(shoutsDataRu)
  })

  $: if($shouts) {
    Object.keys($shouts)
      .forEach(
        sid => ($shouts[sid] && $shouts[sid].topics)
          .forEach(
            topic => topics.add(topic)
          )
        )
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
    font-size: 2vh;
    font-weight: 500;
    line-height: 20px;
    color: black;
  }
</style>
