<script lang="ts">
  import ShoutCard from '../components/ShoutCard.svelte'
  import Author from '../components/Author.svelte'
  import Community from '../components/Community.svelte'
  // import Editor from '../components/Editor.svelte'
  import { authorslist, shoutslist, communitieslist } from '../stores/zine'
  import DiscoursBanner from '../components/DiscoursBanner.svelte'
  import NavTopics from '../components/NavTopics.svelte'

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  //export let topShouts: string[] = [] // TODO: topShouts -> shouts ids

  // $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>

<div class="home">
  <NavTopics />
  <div class="floor floor--1">
    <div class="wide-container row">
      <div class="col-md-3">
        {#each $shoutslist.slice(0, 2) as shout}
          <ShoutCard {shout} />
        {/each}
      </div>
      <div class="col-md-6">
        {#each $shoutslist.slice(2, 3) as shout}
          <ShoutCard {shout} />
        {/each}
      </div>
      <div class="col-md-3">
        {#each $shoutslist.slice(3, 5) as shout}
          <ShoutCard {shout} />
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--2">
    <div class="wide-container row">
      <div class="col-md-6">
        {#each $shoutslist.slice(0, 1) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
      <div class="col-md-6">
        <h4>Самое читаемое</h4>
        {#each $shoutslist.slice(1, 4) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--3">
    <div class="wide-container row">
      {#each $shoutslist.slice(2, 5) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--important">
    <div class="wide-container row">
      <h2 class="col-12"><span>Важное</span></h2>
      {#each $shoutslist.slice(0, 3) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--5">
    <div class="wide-container row">
      {#each $shoutslist.slice(2, 5) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--6">
    <div class="wide-container row">
      <div class="col-md-8">
        <ShoutCard shout={$shoutslist[0]} />
      </div>
      <div class="col-md-4">
        <h4>Авторы месяца</h4>

        {#each $authorslist as author}
          <Author {author} />
        {/each}

        <button class="button">Еще авторы</button>
      </div>
    </div>
  </div>

  <div class="floor floor--7">
    <div class="wide-container row">
      <h2 class="col-12">Коротко</h2>
      {#each $shoutslist.slice(0, 4) as article}
        <div class="col-md-6 col-lg-3">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--important">
    <div class="wide-container row">
      <h2 class="col-12"><span>Избранное</span></h2>
      {#each $shoutslist.slice(0, 4) as article}
        <div class="col-md-3">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--9">
    <div class="wide-container row">
      <div class="col-md-4">
        <h4>Популярные сообщества</h4>
        {#each $communitieslist as community}
          <Community {community} />
        {/each}
      </div>
      <div class="col-md-8">
        <ShoutCard shout={$shoutslist[2]} />
      </div>
    </div>
  </div>

  <div class="floor floor--10">
    <div class="wide-container row">
      {#each $shoutslist.slice(0, 3) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--2">
    <div class="wide-container row">
      <div class="col-md-6">
        <ShoutCard shout={$shoutslist[4]} />
      </div>
      <div class="col-md-6">
        <h4>Самое обсуждаемое</h4>
        {#each $shoutslist.slice(1, 4) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--teaser">
    <div class="wide-container row">
      <div class="col-md-12">
        <ShoutCard shout={$shoutslist[0]} />
      </div>
    </div>
  </div>

  <div class="floor floor--11">
    <div class="wide-container row">
      <div class="col-md-4">
        <ShoutCard shout={$shoutslist[1]} />
      </div>
      <div class="col-md-8">
        <ShoutCard shout={$shoutslist[2]} />
      </div>
    </div>
  </div>

  <div class="floor floor--12">
    <div class="wide-container row">
      <div class="col-md-4">
        <h4>Философия</h4>
        {#each $shoutslist.slice(0, 3) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
      <div class="col-md-4">
        <ShoutCard shout={$shoutslist[3]} />
      </div>
      <div class="col-md-4">
        <ShoutCard shout={$shoutslist[4]} />
      </div>
    </div>
  </div>

  <DiscoursBanner />

  <div class="floor floor--10">
    <div class="wide-container row">
      {#each $shoutslist.slice(2, 5) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
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
