<script>
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'

  initLocalizationContext()
</script>

<main>
  <NavHeader />
  <slot />
</main>

<style lang="scss" global>
  @import '../app.scss';
</style>
