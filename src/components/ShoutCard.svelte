<script lang="ts">
  // import type { Shout, User } from '../graphql/codegen'
  // import { topics, authors } from '../stores/zine'

  export let shout
</script>

<section class="article-card">
  <div class="article-card__cover-container">
    <div class="article-card__cover">
      <img src={shout.cover} alt={shout.title} />
    </div>
  </div>

  <div class="article-card__content">
    {#if shout.topics}
      <div class="article-card__category">
        <a href="/{shout.topics[0].slug}">{shout.topics[0].title}</a>
      </div>
    {/if}

    <div class="article-card__title">
      <a href="/a/{shout.slug}">
        {shout.title}
      </a>
    </div>

    {#if shout.subtitle}
      <div class="article-card__subtitle">{shout.subtitle}</div>
    {/if}

    <div class="article-card__author">
      {#each shout.authors as {slug, viewname}, i}
        {#if i > 0},{/if}
        <a href="/x/{slug}">{viewname}</a>
      {/each}
    </div>
  </div>
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

  :global(.floor--2 .col-md-6) {
    &:first-child {
      .article-card__cover {
        padding-bottom: 50%;
      }
    }

    &:last-child {
      :global(h3) {
        font-weight: 400;
        margin-top: 0;
        text-transform: uppercase;
      }

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
    padding-bottom: $container-padding-x;
    padding-top: $grid-gutter-width;

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

</style>
