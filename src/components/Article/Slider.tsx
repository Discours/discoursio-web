import { createSignal, onCleanup, onMount } from 'solid-js';
import { For } from 'solid-js/web'
import ArticleCard from './Card'
import KeenSlider from 'keen-slider'

let el
let slider

export default (props) => {
  const [current, setCurrent] = createSignal(0)

  onMount(() => {
    slider = new KeenSlider(el, { slides: el.childNodes })
    el.classList.add("keen-slider")
  })
  onCleanup(() => slider && slider.destroy())
  const slideChanged = instance => {
      Boolean(slideChanged) && slideChanged(instance)
      setCurrent(instance.details().relativeSlide)
  }

  return (
    <div class='floor floor--important floor--slider'>
      <div class='wide-container row'>
        <h2 class='col-12'>{props.title}</h2>
        <div class='slider-arrow-prev' onClick={slider.prev()}></div>
        <div ref={el}>
          <For each={props.articles}>
            {(a) => <ArticleCard article={a} settings={{ additionalClass: 'shout-card--with-cover' }} />}
          </For>
        </div>
        <div class='slider-arrow-next' onClick={slider.next()}></div>
      </div>
    </div>
  )
}
