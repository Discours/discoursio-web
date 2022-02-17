<script>
  import ShoutFeed from '../components/ShoutFeed.svelte'
  import UserCard from './UserCard.svelte'

  export let props

  // TODO: UserFull - public user profile page
</script>

{#if props.user}
  <div class="container">
    <div class="row">
      <div class="user-details">
        <UserCard user={props.user} hasFullInfo={true} />
      </div>

      <div class="mode-switcher">
        <div class="mode-switcher__item mode-switcher__item--selected">
          Публикации {props.shouts.length}
        </div>
        <div class="mode-switcher__item"><a href="#">Обсуждения</a></div>
        <div class="mode-switcher__item"><a href="#">Комментарии</a></div>
        <div class="mode-switcher__item"><a href="#">Черновики</a></div>
        <div class="mode-switcher__item"><a href="#">О&nbsp;себе</a></div>
      </div>
    </div>
  </div>

  <ShoutFeed shouts={props.shouts} />
{/if}

<style lang="scss">
  .user-details {
    margin-bottom: 4.4rem;

    :global(.author__name) {
      @include font-size(3.4rem);
      font-weight: 500;
      margin-bottom: 0;
    }

    :global(.author__about) {
      color: #696969;
      @include font-size(1.7rem);
    }

    :global(.circlewrap) {
      margin-right: 4.8rem;
      max-width: 168px;
      min-width: 168px;
      height: 168px;
      width: 168px;
    }

    :global(.circlewrap .userpic) {
      font-size: 2em;
      height: 20px;
      line-height: 168px;
      width: 100%;
    }

    :global(.author__subscribe) {
      margin-top: 2rem;
    }

    :global(.author__details) {
      display: block;
    }

    :global(.button--subscribe) {
      background-color: #000;
      border-radius: 2px;
      padding-bottom: 0.6rem;
      padding-top: 0.6rem;
    }

    :global(.button__label) {
      display: block;
    }

    :global(.button--subscribe .icon) {
      filter: invert(1);
      margin-right: 0.5em;
    }

    :global(.button--subscribe img) {
      vertical-align: text-top;
    }

    :global(.button) {
      margin-right: 1.6rem;
      vertical-align: middle;
    }
  }

  .mode-switcher {
    display: flex;
    @include font-size(1.5rem);
    margin-bottom: 3em;

    a {
      border: none;
      color: #696969;

      &:hover {
        color: #fff;
      }
    }
  }

  .mode-switcher__item {
    margin-right: 1.5em;
  }

  .mode-switcher__item--selected {
    border-bottom: 2px solid;
  }
</style>
