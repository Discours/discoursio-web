<script lang="ts">
import { topics } from '../../stores/zine' 

export let params: { topic: string }
</script>
  
<svelte:head><title>Дискурс : {$topics[params.topic]}</title></svelte:head>
  