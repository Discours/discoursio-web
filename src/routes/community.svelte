<script lang="ts">
  import { getLocalization } from '../i18n'

  const { t } = getLocalization()

  // Editor's publications stats dashboard
</script>

<svelte:head><title>Дискурс : Сообщество</title></svelte:head>

<p>{$t('Hello')}, %username%!</p>
