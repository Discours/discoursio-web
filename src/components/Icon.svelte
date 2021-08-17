<script lang="ts">
  export let name: string
  export let title: string = ''
  export let counter: number = 0
</script>

<img
  src={'icons/' + name + '.svg'}
  alt={title ?? name}
  class:counter
  data-counter={counter}
/>

<style>
  img {
    width: 100%;
    height: 100%;
  }
  .counter::after {
    content: attr(data-counter);
    font-size: smaller;
    background: red;
    color: white;
    top: 0 !important;
    right: 0 !important;
    width: 5px;
  }
</style>
