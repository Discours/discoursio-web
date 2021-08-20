<script>
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import Subnavigation from '../components/Subnavigation.svelte';
  import '../app.scss'

  initLocalizationContext()
</script>

<header>
  <NavHeader/>
</header>
<main>
  <Subnavigation/>
  <slot />
</main>
<footer></footer>
