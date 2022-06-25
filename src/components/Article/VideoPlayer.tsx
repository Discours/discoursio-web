import { useI18n } from "@solid-primitives/i18n"
import { createMemo } from "solid-js"
import { Vimeo, YouTube } from 'solid-social'

export default (props: { src: string, cover?: string }) => {
    const [t,] = useI18n()
    const [width, height] = [740, 420] // TODO: use dynamic sizing
    const element = createMemo(() => {
        if (props.src.replace('youtube', '') !== props.src) {
            const ytid = '' // TODO: extract youtube id
            return <YouTube youTubeId={ytid} width={width} height={height} />
        } else if (props.src.replace('vimeo', '') !== props.src) {
            const vid = '' // TODO: extract vimeo id
            return <Vimeo vimeoId={vid}  width={width} height={height} />
        }
        return <p>{t('videosource is not supported')}</p>
    }) 
    return element()
}