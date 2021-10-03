<script lang="ts">
  import type { User } from '../graphql/codegen'

  export let author: User | Partial<User>
</script>

<div class="author">
  <div class="author__avatar">
    <img src={author.userpic} alt={author.name} />
  </div>

  <div class="author__details">
    <div class="author__name text-3xl text-2xl">
      <a href="/@{author.slug}">{author.name}</a>
    </div>

    <div class="author__about">{author.bio}</div>
  </div>

  <div class="author__subscribe">
    <button class="button button--subscribe">Подписаться</button>
  </div>
</div>

<style lang="scss">
  .author {
    align-items: flex-start;
    display: flex;
    margin-bottom: 2.4rem;

    @include media-breakpoint-down(lg) {
      flex-wrap: wrap;
    }
  }

  .author__avatar {
    border-radius: 100%;
    height: 32px;
    margin-right: 1.2rem;
    min-width: 32px;
    max-width: 32px;
    overflow: hidden;
    position: relative;
    width: 32px;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .author__details {
    flex: 1;
    padding-right: 1.2rem;
  }

  .author__name {
    font-size: 1.7rem;
    margin-bottom: 0.8rem;
  }

  .author__about {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.3);
  }

  @include media-breakpoint-down(lg) {
    .author__subscribe {
      flex: 1 100%;
      padding: 0.8rem 0 0 42px;
    }
  }
</style>
