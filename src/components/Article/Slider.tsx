import { onCleanup, onMount } from 'solid-js'
import { For } from 'solid-js/web'
import ArticleCard from './Card'
import KeenSlider, { KeenSliderInstance } from 'keen-slider'
import './Slider.scss'
import { Shout } from '../../graphql/types.gen'
import Icon from '../Nav/Icon'
import 'keen-slider/keen-slider.min.css'

interface SliderProps {
  title?: string
  articles: Partial<Shout>[]
}


export default (props: SliderProps) => {

  let el: HTMLDivElement | undefined
  let slider: KeenSliderInstance | undefined
  const opts = {
    loop: true,
    slides: {
      origin: 'center',
      perView: 1.66666,
      spacing: 8
    },
  }
  onMount(() => {
    slider = new KeenSlider(el as HTMLElement, opts as any)
    setTimeout(slider.update, 500)
  })
  onCleanup(() => slider && slider.destroy())

  return (
    <div class='floor floor--important floor--slider'>
      <div class='wide-container row'>
        <h2 class='col-12'>{props.title}</h2>
          <div class="keen-slider" ref={el}>
            <div class='slider-arrow-prev' onClick={() => slider?.prev()}>
              <Icon name="slider-arrow"/>
            </div>
            <For each={props.articles}>
              {(a: Partial<Shout>) => (
                <ArticleCard article={a} settings={{ additionalClass: 'shout-card--with-cover keen-slider__slide' }} />
              )}
            </For>
            <div class='slider-arrow-next' onClick={() => slider?.next()}>
              <Icon name="slider-arrow"/>
            </div>
          </div>
      </div>
    </div>
  )
}
