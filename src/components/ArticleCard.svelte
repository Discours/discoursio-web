<script>
  export let articleData;
</script>

<section class="article-card">
  <div class="article-card__cover">
    <img src="{articleData.cover}" alt="{articleData.title}"/>
  </div>

  <div class="article-card__category">
    <a href="{articleData.category.href}">{articleData.category.title}</a>
  </div>

  <div class="article-card__title">
    <a href="{articleData.href}">
      {articleData.title}
    </a>
  </div>

  {#if articleData.description}
    <div class="article-card__description">{articleData.description}</div>
  {/if}

  <div class="article-card__author">
    {#each articleData.author as author, index}
      {#if index > 0},{/if}
      <a href="{author.href}">{author.name}</a>
    {/each}
  </div>
</section>

<style lang="scss">
  @import '../styles/imports';

  .article-card {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    margin-bottom: 2.4rem;
    position: relative;

    .floor-1 &:nth-child(2) {
      border-top: 1px solid rgba(0,0,0,0.1);
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
    color: $default-color;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }

  .article-card__description {
    @include font-size(1.7rem);
    color: #696969;
    font-weight: 400;
    margin-bottom: 0.8rem;
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
    .article-card__description {
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
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
        z-index: 1;
      }
    }
  }

  .article-card--type-1 {
    .article-card__cover {
      margin-top: 1.6rem;
      order: 1;
    }
  }

  .article-card--type-2 {
    padding-bottom: 150%;

    .article-card__author {
      margin-top: 3.2rem;
    }
  }

  .article-card--type-2-1 {
    justify-content: flex-end;
    padding: 2.4rem 2.4rem 50%;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

    @include media-breakpoint-up(md) {
      padding: 3.2rem 3.2rem 50%;
    }

    .article-card__title,
    .article-card__description {
      @include font-size(2rem);
    }
  }
</style>
