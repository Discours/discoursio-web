<script lang="ts">
  import type { Shout } from '../graphql/codegen'
  import { topics, authors, authorslist } from '../stores/zine'
  import Icon from './Icon.svelte'

  export let shout: Shout | Partial<Shout>
</script>

<section class="article-card">
  {#if shout}
  <div class="article-card__cover-container">
    <div class="article-card__cover">
      <img src="{shout.cover}" alt="{shout.title}" />
    </div>

    {#if shout.layout}
      <div class="article-card__type">
        <Icon name="{shout.layout}" />
      </div>
    {/if}
  </div>

  <div class="article-card__content">
    {#each shout.topics as topicslug}
      <div class="article-card__category">
        <a href="/search?t={topicslug}">{$topics[topicslug]? $topics[topicslug].value : topicslug}</a>
      </div>
    {/each}

    <div class="article-card__title">
      <a href="/a/{shout.slug}">
        {@html shout.title}
      </a>
    </div>

    {#if shout.subtitle}
      <div class="article-card__subtitle">{@html shout.subtitle}</div>
    {/if}

    <div class="article-card__author">
      {#each shout.authors as a}
        {#if a}
          {#if shout.authors.indexOf(a) > 0},{/if}
          <a href="/x/{a.slug}">{a.viewname}</a>
        {/if}
      {/each}
    </div>
  </div>
  {/if}
</section>

<style lang="scss">
  .article-card {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    margin-bottom: 2.4rem;
    position: relative;

    :global(.floor--1) &:nth-child(2) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      margin-top: 2.4rem !important;
      padding-top: 2.4rem;

      .article-card__cover {
        display: none;
      }
    }
  }

  .article-card__cover-container {
    position: relative;
  }

  .article-card__cover {
    height: 0;
    margin-bottom: 1.6rem;
    padding-bottom: 56.2%;
    position: relative;

    img {
      height: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
    }
  }

  .article-card__category,
  .article-card__author {
    a {
      position: relative;
      z-index: 2;
    }
  }

  .article-card__category {
    @include font-size(1.2rem);
    margin-bottom: 0.8rem;
    text-transform: uppercase;

    a {
      color: $link-color;
    }
  }

  .article-card__title {
    @include font-size(2.2rem);
    font-weight: 700;
    margin-bottom: 0.8rem;

    a {
      color: $default-color;

      &:before {
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
      }
    }
  }

  .article-card__subtitle {
    @include font-size(1.7rem);
    font-weight: 400;
    margin-bottom: 0.8rem;

    a {
      color: #696969;
    }
  }

  .article-card__author {
    @include font-size(1.5rem);
    font-weight: 400;

    a {
      color: #9fa1a7;
    }
  }

  .article-card--with-cover {
    padding: 2.4rem;

    &,
    a,
    .article-card__title,
    .article-card__subtitle {
      color: #fff;
    }

    .article-card__cover {
      height: 100%;
      left: 0;
      padding: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;

      &:after {
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        );
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
        z-index: 1;
      }
    }
  }

  .article-card__type {
    background: #fff;
    border-radius: 100%;
    height: 3.2rem;
    position: absolute;
    right: 0.8rem;
    text-align: center;
    top: 0.8rem;
    width: 3.2rem;
    z-index: 1;

    :global(img) {
      height: auto;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: auto;
    }
  }

  :global(.floor--2 .col-md-6) {
    &:first-child {
      .article-card__cover {
        padding-bottom: 50%;
      }
    }

    &:last-child {
      .article-card {
        flex-direction: row;
        margin-bottom: 2.4rem;
      }

      .article-card__cover-container {
        @include make-col(4);
      }

      .article-card__cover {
        margin-bottom: 0;
      }

      .article-card__content {
        padding-left: 1.6rem;
      }

      .article-card__title {
        @include font-size(1.7rem);
      }

      .article-card__title,
      .article-card__subtitle {
        display: inline;
      }

      .article-card__author {
        margin-top: 0.4rem;
      }
    }
  }

  :global(.floor--3 .col-md-4) {
    .article-card__cover-container {
      margin-top: 1.6rem;
      order: 2;
    }
  }

  :global(.floor--important) {
    padding-bottom: 0;
    padding-top: $container-padding-x;

    @include media-breakpoint-up(md){
      padding-top: $grid-gutter-width;
    }

    :global(h2) {
      position: relative;
      text-align: center;

      &:before {
        background: #fff;
        content: '';
        height: 4px;
        left: $container-padding-x;
        position: absolute;
        top: 50%;
        width: calc(100% - #{$grid-gutter-width});
      }

      :global(span) {
        background: #000;
        padding: 0 $container-padding-x;
        position: relative;
        z-index: 1;
      }
    }

    .article-card {
      margin-bottom: $grid-gutter-width;
    }

    .article-card__category,
    .article-card__title {
      a {
        color: #fff;
      }
    }

    .article-card__title,
    .article-card__subtitle {
      display: inline;
    }

    .article-card__author {
      margin-top: 0.8rem;
    }
  }

  :global(.floor--5 .col-md-4) {
    .article-card__cover {
      padding-bottom: 62.5%;
    }

    .article-card__title {
      @include font-size(2.4rem);
    }
  }

  :global(.floor--6),
  :global(.floor--7),
  :global(.floor--teaser),
  :global(.floor--11 .col-md-8) {
    .article-card {
      &,
      a,
      .article-card__title,
      .article-card__subtitle {
        color: #fff;
      }

      .article-card__cover-container,
      .article-card__cover,
      .article-card__content {
        height: 100%;
        left: 0;
        margin: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      .article-card__content {
        padding: 2.4rem;
        z-index: 1;
      }

      .article-card__cover {
        padding: 0;

        &:after {
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.6)
          );
          content: '';
          height: 100%;
          position: absolute;
          width: 100%;
          z-index: 1;
        }
      }
    }
  }

  :global(.floor--6) {
    .article-card {
      max-height: 55%;
      padding: 55% 2.4rem 0;
    }

    .article-card__content {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  :global(.floor--7) {
    .article-card {
      padding: 160% 2.4rem 0;
    }

    .article-card__title {
      @include font-size(2.6rem);
    }
  }

  :global(.floor--9) {
    .article-card__title,
    .article-card__subtitle {
      display: inline;
      @include font-size(2.2rem);
    }

    .article-card__author {
      margin-top: 0.8rem;
    }

    .article-card__cover {
      padding-bottom: 50%;
    }
  }

  :global(.floor--teaser) {
    .article-card {
      min-height: 15em;
      padding-top: 33.33%;
    }

    .article-card__content {
      justify-content: center;
      display: flex;
      flex-direction: column;
    }

    .article-card__title {
      @include font-size(4.8rem);
    }
  }

  :global(.floor--11) {
    :global(.col-md-4) {
      .article-card__cover-container {
        margin-top: 1.6rem;
        order: 2;
      }
    }

    :global(.col-md-8) {
      .article-card {
        padding-top: 50%;
      }

      .article-card__title,
      .article-card__subtitle {
        @include font-size(2rem)
      }

      .article-card__content {
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
      }
    }
  }

  :global(.floor--12) {
    :global(.col-md-4):first-child {
      .article-card__cover-container,
      .article-card__category {
        display: none;
      }

      .article-card__title {
        @include font-size(1.7rem);
      }
    }
  }
</style>
