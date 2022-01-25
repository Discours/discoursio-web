<script>
  import { onMount } from 'svelte'

  export let stretchFirst = false
  export let gridGap = '0.5em'
  export let colWidth = 'minmax(Min(20em, 100%), 1fr)'
  let grids = []
  let el

  const refreshLayout = () => {
    grids.forEach((grid) => {
      /* get the post relayout number of columns */
      const ncol = getComputedStyle(grid._el).gridTemplateColumns.split(
        ' '
      ).length

      grid.items.forEach((c) => {
        const new_h = c.getBoundingClientRect().height
        if (new_h !== +c.dataset.h) {
          c.dataset.h = new_h
          grid.mod++
        }
      })

      /* if the number of columns has changed */
      if (grid.ncol !== ncol || grid.mod) {
        /* update number of columns */
        grid.ncol = ncol
        /* revert to initial positioning, no margin */
        grid.items.forEach((c) => c.style.removeProperty('margin-top'))
        /* if we have more than one column */
        if (grid.ncol > 1) {
          grid.items.slice(ncol).forEach((c, i) => {
            const prev_fin =
              grid.items[i].getBoundingClientRect()
                .bottom /* bottom edge of item above */
            const curr_ini =
              c.getBoundingClientRect().top /* top edge of current item */
            c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`
          })
        }
        grid.mod = 0
      }
    })
  }
  const filterItems = (c) =>
    c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1

  onMount(() => {
    grids = [el].map((grid) => {
      return {
        _el: grid,
        gap: parseFloat(getComputedStyle(grid).rowGap),
        items: [...grid.childNodes].filter(filterItems),
        ncol: 0,
        mod: 0
      }
    })
    refreshLayout() /* initial load */
  })
</script>

<svelte:window on:resize={refreshLayout} />
<div
  bind:this={el}
  class="masonry"
  class:stretchFirst
  style={`--grid-gap: ${gridGap}; --col-width: ${colWidth};`}
>
  <slot />
</div>

<style>
  :global(.masonry) {
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--col-width));
    grid-template-rows: masonry;
    justify-content: center;
    grid-gap: var(--grid-gap);
    padding: var(--grid-gap);
  }
  :global(.masonry > *) {
    align-self: start;
  }
  :global(.masonry.stretch-first > *:first-child) {
    grid-column: 1/ -1;
  }
</style>
