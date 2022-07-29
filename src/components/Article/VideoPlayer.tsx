import { Show } from 'solid-js/web'
import { YouTube, Vimeo } from 'solid-social'

export default (props: { youtubeId?: string, vimeoId?: string, title?: string }) => {
    // TODO: styling
    return (
    <Show when={props.vimeoId} fallback={
        <YouTube youtubeId={props.youtubeId} />
        }>
        <Vimeo vimeoId={props.vimeoId} />
    </Show>
    )
}