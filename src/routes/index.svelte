<script lang="ts">
  import NavTopics from '../components/NavTopics.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  // import Editor from '../components/Editor.svelte'
  import { shouts } from '../stores/zine'
  import ArticleCard from '../components/ArticleCard.svelte';

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  export let topShouts: string[] = [] // TODO: topShouts -> shouts ids

  $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query

  const ARTICLES = [
    {
      title: 'Эми Петерсон «Создание литературы в эпоху антропоцена»',
      href: '/',
      cover: `http://picsum.photos/248/152?r=${Math.random()}`,
      category: {
        title: 'Литература',
        href: '/topic/2',
      },
      author: [
        {
          name: 'Александр Бардашев',
          href: '/author/7',
        },
        {
          name: 'Анастасия Лозовая',
          href: '/author/6',
        },
      ]
    },
    {
      title: 'Рабский менталитет — это миф Почему россияне не обречены на вечную несвободу',
      href: '/',
      cover: `http://picsum.photos/248/152?r=${Math.random()}`,
      category: {
        title: 'Политика',
        href: '/topic/3',
      },
      author: [
        {
          name: 'Иван Вахрушев',
          href: '/author/3',
        },
      ]
    },
    {
      title: '«Мы уничтожим коммунистический режим Северной Кореи!»',
      description: 'Как работала пропаганда в южнокорейских школах',
      href: '/',
      cover: `http://picsum.photos/248/152?r=${Math.random()}`,
      category: {
        title: 'Культура',
        href: '/topic/4',
      },
      author: [
        {
          name: 'Екатерина Ильина',
          href: '/author/1',
        },
        {
          name: 'Иван Вахрушев',
          href: '/author/2',
        },
      ]
    },
    {
      title: '«Здесь я свободен во всём» Как живут нелегальные торговцы из электричек',
      href: '/',
      cover: `http://picsum.photos/248/152?r=${Math.random()}`,
      category: {
        title: 'Деньги',
        href: '/topic/5',
      },
      author: [
        {
          name: 'Марина Никифорова',
          href: '/author/5',
        },
      ]
    },
    {
      title: 'Их вещи: монологи секс-работниц о дорогих им предметах',
      href: '/',
      cover: `http://picsum.photos/248/152?r=${Math.random()}`,
      category: {
        title: 'Личный опыт',
        href: '/topic/6',
      },
      author: [
        {
          name: 'Владимир Коркунов',
          href: '/author/6',
        },
      ]
    },
  ]
</script>

<div class="home">
  <NavTopics />

  <div class="floor-1 row">
    <div class="col-md-3">
      {#each ARTICLES.slice(0, 2) as article}
        <ArticleCard articleData="{article}"/>
      {/each}
    </div>
    <div class="col-md-6">
      {#each ARTICLES.slice(2, 3) as article}
        <ArticleCard articleData="{article}"/>
      {/each}
    </div>
    <div class="col-md-3">
      {#each ARTICLES.slice(3, 5) as article}
        <ArticleCard articleData="{article}"/>
      {/each}
    </div>
  </div>

  <!-- svelte-ignore a11y-missing-attribute -->
  {#each topShouts as shid}
    <ShoutCard shout={$shouts[shid]} />
  {/each}
</div>
