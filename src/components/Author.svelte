<script lang="ts">
  import type { User } from '../graphql/codegen'
  import Userpic from './Userpic.svelte'

  export let author: User | Partial<User>
</script>

<div class="author">
  {#if author}
    <Userpic {author} />

    <div class="author__details">
      <div class="author__name text-3xl text-2xl">
        <a href="/@{author.slug}">{author.name}</a>
      </div>

      <div class="author__about">{author.bio}</div>
    </div>

    <div class="author__subscribe">
      <button class="button button--subscribe">Подписаться</button>
    </div>
  {/if}
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
