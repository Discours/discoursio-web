export default (props: { src: string, cover?: string, title?: string }) => {
    return <div class="audio-track">
        <audio src={props.src} controls={true} />
        <span class='audio-title'>{props.title || ''}</span>
    </div>
}