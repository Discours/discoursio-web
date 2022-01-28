<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import type { Topic } from '$lib/codegen'
  import { subscribe } from '$lib/cookie'
  import { capitalize } from '$lib/utils'

  import MD from '../components/MD.svelte'
  import { openModal } from '../stores/app'
  import { session, token } from '../stores/user'
  import { subscribedShouts } from '../stores/zine'
  import Icon from './DiscoursIcon.svelte'
  import ShoutComment from './ShoutComment.svelte'
  import UserCard from './UserCard.svelte'

  export let props
  let shout
  let canEdit
  let mainTopic
  let commentsById: { [key: number]: Partial<Comment> } = {}
  onMount(() => {
    if (shout.comments.length === 0) console.log('shout: no comments')
  })

  // TODO: editing logix
  $: shout = props.shout
  $: if ($session) {
    canEdit = !!shout.authors.find((a) => a.slug === $session.slug)
  }

  $: if (shout.comments && shout.comments.length > 0) {
    shout.comments.forEach((c) => {
      commentsById[c.id] = c
    })
  }

  const deepest = 6

  const getCommentLevel = (c, level = 0) => {
    if (c && c.replyTo && level < deepest) {
      level += 1
      return getCommentLevel(commentsById[c.replyTo], level)
    } else {
      return level
    }
  }

  let showTopic: Partial<Topic>

  $: if (shout) {
    showTopic = shout.topics[0]
    if (shout.mainTopic) {
      showTopic = shout.topics.find((t) => {
        if (t === undefined) return
        else return t.slug === shout.mainTopic
      })

      mainTopic = shout.topics.find((item) => item.slug === shout.mainTopic)
    }
    // console.log(showTopic)
  }
</script>

<div class="shout" transition:fade>
  {#if shout}
    <div class="shout wide-container">
      <div class="row">
        <article class="col-md-6 offset-md-3">
          <div class="shout__header">
            <div class="shout__topic">
              <a href={`/topic/${mainTopic.slug}`}
                >#{@html mainTopic.title.replace(' ', '&nbsp;')}</a
              >
            </div>

            <h1>{shout.title}</h1>
            {#if shout.subtitle}
              <h4>{capitalize(shout.subtitle, false)}</h4>{/if}

            <div class="shout__author">
              {#each shout.authors as author, index}
                {#if index > 0},{/if}
                <a href="/@{author.slug}">{author.name}</a>
              {/each}
            </div>

            <div
              class="shout__cover"
              style={`background-image: url('${shout.cover}')`}
            />
          </div>

          <div class="shout__body">
            <MD body={shout.body} />
          </div>
        </article>
      </div>

      <div class="col-md-8 offset-md-2">
        <div class="shout-stats">
          <div class="shout-stats__item shout-stats__item--likes">
            <Icon name="like" />
            {shout.ratings.reduce((acc, curr) => acc + curr.value, 0)}
            <Icon name="like" />
          </div>
          <div class="shout-stats__item">
            <Icon name="view" />
            {shout.stat.views}
          </div>
          <div class="shout-stats__item">
            <a
              href="#bookmark"
              on:click={() => subscribe(shout.slug, 'shouts')}
            >
              <Icon name="bookmark" />
              {#if shout.slug in $subscribedShouts}
                Сохранено
              {:else}
                В&nbsp;избранное
              {/if}
            </a>
          </div>
          <div class="shout-stats__item">
            <a href="#share" on:click={() => ($openModal = 'share')}>
              <Icon name="share" />
              Поделиться
            </a>
          </div>
        </div>

        <div class="topics-list">
          {#each shout.topics as topic}
            <div class="shout__topic">
              <a href="/topic/{topic.slug}">{topic.title}</a>
            </div>
          {/each}
        </div>

        <div class="shout__authors-list">
          <h4>Авторы</h4>

          {#each shout.authors as user, index}
            {#if index > 0},{/if}
            <UserCard {user} hasSubscribeButton={false} />
          {/each}
        </div>

        <h2>Комментарии {shout.comments.length}</h2>

        {#each shout.comments as comment}
          <ShoutComment
            {comment}
            level={getCommentLevel(comment)}
            canEdit={comment.author.id === $session.id}
          />
        {/each}
        {#if !$token}
          <div class="comment-warning">
            Чтобы оставить комментарий, необходимо
            <a href={''} on:click|preventDefault={() => ($openModal = 'auth')}
              ><i>зарегистрироваться или войти</i></a
            >
          </div>
        {:else}
          <textarea
            class="write-comment"
            rows="1"
            placeholder="Написать комментарий"
          />
        {/if}
      </div>
    </div>
  {:else}
    Загрузка...
  {/if}
</div>

<style lang="scss">
  h1 {
    @include font-size(4rem);
    line-height: 1.1;
    margin-top: 0.5em;
  }

  :global(h2) {
    line-height: 1.1;
  }

  :global(img) {
    max-width: 100%;
  }

  .shout {
    padding-top: 2em;
  }

  .shout__header {
    margin-bottom: 2em;

    @include media-breakpoint-up(md) {
      margin: 0 -16.6666% 2em;
    }
  }

  .article-card__category {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    text-transform: uppercase;
  }

  .shout__cover {
    background-size: cover;
    height: 0;
    padding-bottom: 56.2%;
  }

  .shout__body {
    font-size: 1.7rem;
    line-height: 1.6;

    :global(img) {
      display: block;
      margin-bottom: 0.5em;
    }

    :global(blockquote) {
      border-left: 4px solid;
      font-size: 2rem;
      font-weight: 500;
      font-style: italic;
      line-height: 1.4;
      margin: 1.5em 0 1.5em -16.6666%;
      padding: 0 0 0 1em;
    }

    :global(mark) {
      background: none;
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.4;
    }
  }

  .shout__author {
    margin-bottom: 2em;
  }

  .shout__authors-list {
    margin-top: 2em;

    :global(h4) {
      color: #696969;
      font-size: 1.5rem;
      font-weight: normal;
    }
  }

  .write-comment {
    border: 2px solid #f6f6f6;
    @include font-size(1.7rem);
    outline: none;
    padding: 0.2em 0.4em;
    width: 100%;

    &::placeholder {
      color: #858585;
    }
  }

  .comment-warning {
    background: #f6f6f6;
    @include font-size(2.2rem);
    margin-bottom: 1em;
    padding: 2.4rem 1.8rem;
  }

  .topic {
    display: inline-flex;
  }

  .topic a {
    /* white-space: nowrap; */
    color: black;
    padding: 0.3vh;
  }
  .topic a:hover {
    font-weight: 500;
  }

  .shout-stats {
    border-bottom: 1px solid #e8e8e8;
    border-top: 4px solid #000;
    padding: 3.2rem 0;
  }

  .shout-stats__item {
    @include font-size(1.7rem);
    font-weight: 500;
    display: inline-block;
    margin-right: $grid-gutter-width;
    vertical-align: baseline;

    :global(.icon) {
      display: inline-block;
      margin-right: 0.2em;
      transition: filter 0.2s;
      vertical-align: middle;
    }

    :global(img) {
      display: block;
    }

    a {
      border: none;

      &:hover {
        :global(.icon) {
          filter: invert(1);
        }
      }
    }
  }

  .shout-stats__item--likes {
    :global(.icon) {
      vertical-align: baseline;
    }

    :global(.icon):last-of-type {
      transform: rotate(180deg);
      transform-origin: center;
      margin-left: 0.3em;
      vertical-align: middle;
    }
  }

  .topics-list {
    margin: 2.4rem 0;

    .shout__topic {
      display: inline-block;
      margin: 0 0.8rem 0.8rem 0;

      a {
        background: #f6f6f6;
        color: #000;
        padding: 0.4rem 0.8rem;
        transition: background-color 0.2s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
</style>
