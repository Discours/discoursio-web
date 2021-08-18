<script>
  import { initLocalizationContext } from '../i18n/index'
  import NavHeader from '../components/NavHeader.svelte'
  import '../app.scss'

  initLocalizationContext()
</script>

<main>
  <NavHeader />
  <slot />
</main>
