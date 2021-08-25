<script lang="ts">
  import ShoutCard from '../components/ShoutCard.svelte'
  import Author from '../components/Author.svelte'
  // import Editor from '../components/Editor.svelte'
  import {authorslist, shoutlist} from '../stores/zine'

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  //export let topShouts: string[] = [] // TODO: topShouts -> shouts ids

  // $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>

<div class="home">
  <div class="floor floor--1">
    <div class="wide-container row">
      <div class="col-md-3">
        {#each $shoutlist.slice(0, 2) as shout}
          <ShoutCard {shout}/>
        {/each}
      </div>
      <div class="col-md-6">
        {#each $shoutlist.slice(2, 3) as shout}
          <ShoutCard {shout}/>
        {/each}
      </div>
      <div class="col-md-3">
        {#each $shoutlist.slice(3, 5) as shout}
          <ShoutCard {shout}/>
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--2">
    <div class="wide-container row">
      <div class="col-md-6">
        {#each $shoutlist.slice(0, 1) as article}
          <ShoutCard shout="{article}"/>
        {/each}
      </div>
      <div class="col-md-6">
        <h3>Самое читаемое</h3>
        {#each $shoutlist.slice(1, 4) as article}
          <ShoutCard shout="{article}"/>
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--3">
    <div class="wide-container row">
      {#each $shoutlist.slice(2, 5) as article}
        <div class="col-md-4">
          <ShoutCard shout="{article}"/>
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--important">
    <div class="wide-container row">
      <h2 class="col-12"><span>Важное</span></h2>
      {#each $shoutlist.slice(0, 3) as article}
        <div class="col-md-4">
          <ShoutCard shout="{article}"/>
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--5">
    <div class="wide-container row">
      {#each $shoutlist.slice(2, 5) as article}
        <div class="col-md-4">
          <ShoutCard shout="{article}"/>
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--6">
    <div class="wide-container row">
      <div class="col-md-8">
        <ShoutCard shout="{$shoutlist[0]}"/>
      </div>
      <div class="col-md-4">
        <h4>Авторы месяца</h4>

        {#each $authorslist.slice(0, 4) as author}
          <Author author="{author}"/>
        {/each}

        <button class="button">Еще авторы</button>
      </div>
    </div>
  </div>

  <div class="floor floor--7">
    <div class="wide-container row">
      <h2 class="col-12">Коротко</h2>
      {#each $shoutlist.slice(0, 4) as article}
        <div class="col-md-6 col-lg-3">
          <ShoutCard shout="{article}"/>
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--important">
    <div class="wide-container row">
      <h2 class="col-12"><span>Избранное</span></h2>
      {#each $shoutlist.slice(0, 4) as article}
        <div class="col-md-3">
          <ShoutCard shout="{article}"/>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .floor {
    margin-bottom: 6.4rem;

    .wide-container {
      padding: 0;
    }
  }

  .floor--important {
    background: #000;
    color: #fff;
  }
</style>
