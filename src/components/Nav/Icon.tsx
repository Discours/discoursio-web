import { mergeProps, Show } from 'solid-js'
import './Icon.css'

export default (_props: any) => {
  const props = mergeProps({ title: '', counter: 0 }, _props)

  return (
    <div class='icon'>
      <img src={`/icons/${props.name}.svg`} alt={props.title ?? props.name} />
      <Show when={props.counter}>
        <div class='notifications-counter'>{props.counter.toString()}</div>
      </Show>
    </div>
  )
}
