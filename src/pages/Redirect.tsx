import { useI18n } from '@solid-primitives/i18n'
import { Navigate, useRouteData } from 'solid-app-router'
import { Component, createMemo, createSignal, onMount, Show } from 'solid-js'
import { useRouteReadyState } from '../utils/routeReadyState'

interface RedirectData {
  reason: string
  where?: string
}

export const Redirect: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<RedirectData>()
  const [now, setNow] = createSignal(false)
  const href = createMemo(() => data.where || window.location.pathname)
  onMount(() => {
    setTimeout(() => setNow(true), 3000)
    console.log('[mount] redirect')
  })
  useRouteReadyState()
  return (
    <>
      <h4>{data.reason}:</h4>
      <h5>{t('you will be redirected in 3 seconds...')}</h5>
      <Show when={now()}>
        <Navigate href={href()} />
      </Show>
    </>
  )
}

export default Redirect
