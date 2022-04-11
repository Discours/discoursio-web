import { createSignal, JSX, onCleanup, onMount } from 'solid-js'
import { For } from 'solid-js/web'
import ArticleCard from './Card'
import KeenSlider, { KeenSliderInstance } from 'keen-slider'
import { Shout } from '../../graphql/types.gen'

let el: HTMLDivElement
let slider: KeenSliderInstance

interface SliderProps {
  title?:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | JSX.FunctionElement
    | (string & {})
    | null
    | undefined
  articles: boolean | readonly unknown[] | null | undefined
}

export default (props: SliderProps) => {
  const [current, setCurrent] = createSignal(0)

  onMount(() => {
    slider = new KeenSlider(el)
    el.classList.add('keen-slider')
  })

  onCleanup(() => slider && slider.destroy())

  // TODO: implement slider

  return (
    <div class='floor floor--important floor--slider'>
      <div class='wide-container row'>
        <h2 class='col-12'>{props.title}</h2>
        <div class='slider-arrow-prev' onClick={() => slider.prev()}></div>
        <div ref={el}>
          <For each={props.articles}>
            {(a: Partial<Shout>) => (
              <ArticleCard article={a} settings={{ additionalClass: 'shout-card--with-cover' }} />
            )}
          </For>
        </div>
        <div class='slider-arrow-next' onClick={() => slider.next()}></div>
      </div>
    </div>
  )
}
