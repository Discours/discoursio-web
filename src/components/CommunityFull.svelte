<script lang="ts">
  export let props
  let community
  $: community = props.community
  // TODO: full community view
</script>

<div class="community">
  {#if community}
    <div class="community__avatar">
      <a href={community.slug}>
        <img src={community.pic} alt={community.name} />
      </a>
    </div>

    <div class="community__details">
      <div class="community__name">
        <a href={community.slug}>{community.name}</a>
      </div>

      <div class="community__about">{@html community.desc}</div>

      <div class="community__subscribe">
        <button class="button button--subscribe">Подписаться</button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .community {
    align-items: flex-start;
    display: flex;
    margin-bottom: 2.4rem;

    @include media-breakpoint-down(lg) {
      flex-wrap: wrap;
    }
  }

  .community__avatar {
    border-radius: 100%;
    height: 64px;
    margin-right: 1.2rem;
    min-width: 64px;
    max-width: 64px;
    overflow: hidden;
    position: relative;
    width: 64px;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .community__details {
    flex: 1;
    padding-right: 1.2rem;
  }

  .community__name {
    font-size: 1.7rem;
    margin-bottom: 0.8rem;
  }

  .community__about {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.3);
  }

  .community__subscribe {
    margin-top: 0.8rem;
  }
</style>
