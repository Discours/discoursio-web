import { createSignal, JSX, onCleanup, onMount } from 'solid-js'
import { For } from 'solid-js/web'
import ArticleCard from './Card'
import KeenSlider, { KeenSliderInstance } from 'keen-slider'
import 'keen-slider/keen-slider.min.css'
import './Slider.scss'
import { Shout } from '../../graphql/types.gen'
import Icon from '../Nav/Icon'

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

  let el: HTMLDivElement
  let slider: KeenSliderInstance

  onMount(() => {
    // TODO: FIX timeout delay
    setTimeout(() => {
      slider = new KeenSlider(el, {
        loop: true,
        slides: {
          origin: 'center',
          perView: 1.6666,
          spacing: 8
        },
      })
    }, 500)
  })

  onCleanup(() => slider && slider.destroy())

  return (
    <div class='floor floor--important floor--slider'>
      <div class='wide-container row'>
        <h2 class='col-12'>{props.title}</h2>
        <div class="keen-slider" ref={el}>
          <div class='slider-arrow-prev' onClick={() => slider.prev()}>
            <Icon name="slider-arrow"/>
          </div>
          <For each={props.articles}>
            {(a: Partial<Shout>) => (
              <ArticleCard article={a} settings={{ additionalClass: 'shout-card--with-cover keen-slider__slide' }} />
            )}
          </For>
          <div class='slider-arrow-next' onClick={() => slider.next()}>
            <Icon name="slider-arrow"/>
          </div>
        </div>
      </div>
    </div>
  )
}
