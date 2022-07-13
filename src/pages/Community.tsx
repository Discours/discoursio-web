
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { Show } from 'solid-js'
import { ZineState } from '../context/zine'
import '../styles/Community.scss'

export default () => {
    const [t] = useI18n()
    const data = useRouteData<ZineState>()
    return <Show when={data.stage > 0}>{t('Community')}</Show>
}