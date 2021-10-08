<script lang="ts">
  import ShoutCard from '../components/ShoutCard.svelte'
  import Author from '../components/Author.svelte'
  import Community from '../components/Community.svelte'
  import { shouts, authors, communities, topics, topicslist, authorslist, shoutslist, communitieslist } from '../stores/zine'
  import DiscoursBanner from '../components/DiscoursBanner.svelte'
  import NavTopics from '../components/NavTopics.svelte'
  import { onMount } from 'svelte'

  import shoutsData from '../data/articles.json'
  import authorsData from '../data/authors.json'
  import topicsData from '../data/topics.json'
  import communitiesData from '../data/communities.json'

  let loaded = false

$: if(!loaded) {
    console.log('app: root page loading mock data')
    $shouts = shoutsData
    $shoutslist = Object.values($shouts)
    $authors = authorsData
    $authorslist = Object.values($authors)
    $topics = topicsData
    $topicslist = Object.values($topics)
    $communities = communitiesData
    $communitieslist = Object.values($communities)
    loaded = true
  }
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>

<div class="home">
  {#if $topicslist.length > 0}<NavTopics data={$topicslist} />{/if}

  {#if loaded}

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
        {#each $shoutslist.slice(5, 6) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
      <div class="col-md-6">
        <h4>Самое читаемое</h4>
        {#each $shoutslist.slice(6, 10) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--3">
    <div class="wide-container row">
      {#each $shoutslist.slice(10, 13) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--important">
    <div class="wide-container row">
      <h2 class="col-12"><span>Важное</span></h2>
      {#each $shoutslist.slice(13, 16) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--5">
    <div class="wide-container row">
      {#each $shoutslist.slice(16, 18) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--6">
    <div class="wide-container row">
      <div class="col-md-8">
        <ShoutCard shout={$shoutslist[60]} />
      </div>
      <div class="col-md-4">
        <h4>Авторы месяца</h4>

        {#each $authorslist.slice(6) as author}
          <Author {author} />
        {/each}

        <button class="button">Еще авторы</button>
      </div>
    </div>
  </div>

  <div class="floor floor--7">
    <div class="wide-container row">
      <h2 class="col-12">Коротко</h2>
      {#each $shoutslist.slice(10, 14) as article}
        <div class="col-md-6 col-lg-3">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--important">
    <div class="wide-container row">
      <h2 class="col-12"><span>Избранное</span></h2>
      {#each $shoutslist.slice(30, 34) as article}
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
        <ShoutCard shout={$shoutslist[28]} />
      </div>
    </div>
  </div>

  <div class="floor floor--10">
    <div class="wide-container row">
      {#each $shoutslist.slice(20, 23) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  <div class="floor floor--2">
    <div class="wide-container row">
      <div class="col-md-6">
        <ShoutCard shout={$shoutslist[47]} />
      </div>
      <div class="col-md-6">
        <h4>Самое обсуждаемое</h4>
        {#each $shoutslist.slice(41, 44) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
    </div>
  </div>

  <div class="floor floor--teaser">
    <div class="wide-container row">
      <div class="col-md-12">
        <ShoutCard shout={$shoutslist[70]} />
      </div>
    </div>
  </div>

  <div class="floor floor--11">
    <div class="wide-container row">
      <div class="col-md-4">
        <ShoutCard shout={$shoutslist[11]} />
      </div>
      <div class="col-md-8">
        <ShoutCard shout={$shoutslist[23]} />
      </div>
    </div>
  </div>

  <div class="floor floor--12">
    <div class="wide-container row">
      <div class="col-md-4">
        <h4>Философия</h4>
        {#each $shoutslist.slice(50, 53) as article}
          <ShoutCard shout={article} />
        {/each}
      </div>
      <div class="col-md-4">
        <ShoutCard shout={$shoutslist[33]} />
      </div>
      <div class="col-md-4">
        <ShoutCard shout={$shoutslist[44]} />
      </div>
    </div>
  </div>

  <DiscoursBanner />

  <div class="floor floor--10">
    <div class="wide-container row">
      {#each $shoutslist.slice(62, 65) as article}
        <div class="col-md-4">
          <ShoutCard shout={article} />
        </div>
      {/each}
    </div>
  </div>

  {/if}

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
