
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { Show } from 'solid-js'
import { CommunityRouteData } from './Community.data'
import './Community.scss'

export default (props: any) => {
    const [t] = useI18n()
    const data = useRouteData<CommunityRouteData>()
    return <Show when={!data.loading}>{t('Community')}</Show>
}