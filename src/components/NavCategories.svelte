<script>
  import { onMount } from 'svelte'
  import { lang, Language } from '../stores/common'

  let data
  onMount(() => {
    // TODO: get system lang
    const lng = $lang === Language.RU ? '' : $lang + '.'
    data = import(`/data.${lng}json`)
  })
</script>

<section>
  <div style="height: 60px;" />
  <div class="cats">
    {#if data}
      {#each Object.entries(data.projects) as [project, data]}
        <a href={'/p/' + project}>{data.name}</a>
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

  .cats {
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
