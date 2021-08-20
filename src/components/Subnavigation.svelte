<script>
  const SUBNAVIGATION = [
    {
      title: 'статьи',
      href: '/',
    },
    {
      title: 'искусство',
      href: '/',
    },
    {
      title: 'события',
      href: '/',
    },
    {
      title: 'молоко+',
      href: '/',
    },
    {
      title: 'галерея',
      href: '/',
    },
    {
      title: 'личный опыт',
      href: '/',
    },
    {
      title: 'общество',
      href: '/',
    },
    {
      title: 'культура',
      href: '/',
    },
    {
      title: 'теории',
      href: '/',
    },
    {
      title: 'спецпроекты',
      href: '/',
    },
  ]
</script>

<nav class="subnavigation">
  <ul>
    {#each SUBNAVIGATION as navItem, index}
      <li class:selected={index === 0}>
        {#if index === 0}
          {navItem.title}
        {:else}
          <a href={navItem.href}>{navItem.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import '../styles/variables';
  @import '../../node_modules/bootstrap/scss/vendor/rfs';

  .subnavigation {
    @include font-size(1.7rem);
    margin: 2rem 0 9rem;

    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin-right: 2.4rem;

      &:last-child {
        margin-right: 0;
      }
    }

    .selected {
    }
  }
</style>
