import { For } from 'solid-js/web'
import ArticleCard from './Card'
import { Swiper, SwiperOptions, Navigation, Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import './Slider.scss'
import { Shout } from '../../graphql/types.gen'
import { createEffect, createMemo, createSignal, Show, onMount } from 'solid-js'
import Icon from '../Nav/Icon'

interface SliderProps {
  title?: string
  articles: Partial<Shout>[]
}

export default (props: SliderProps) => {
  let el: HTMLDivElement | undefined
  let pagEl: HTMLDivElement | undefined
  let nextEl: HTMLDivElement | undefined
  let prevEl: HTMLDivElement | undefined
  const opts: SwiperOptions = {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1.66666,
    spaceBetween: 8,
    modules: [Navigation, Pagination],
    speed: 500,
    navigation: { nextEl, prevEl },
    pagination: {
      el: pagEl,
      type: 'bullets',
      clickable: true
    }
  }

  const [swiper, setSwiper] = createSignal<Swiper>()
  createEffect(() => {
    if(!swiper() && !!el) {
      setTimeout(() => {
        setSwiper(new Swiper(el as HTMLDivElement, opts));
      }, 100);
    }
  })
  const articles = createMemo(() => props.articles)
  return (
    <div class='floor floor--important floor--slider'>
      <div class='wide-container row'>
        <h2 class='col-12'>{props.title}</h2>
        <Show when={!!articles()}>
          <div class="swiper" ref={el}>
            <div class="swiper-wrapper">
              <For each={articles()}>
              {(a: Partial<Shout>) => (

                <ArticleCard
                  article={a}
                  settings={{ additionalClass: 'shout-card--with-cover swiper-slide' }}
                />

              )}
              </For>
            </div>
            <div class="slider-arrow-next" ref={nextEl} onClick={() => swiper()?.slideNext()}>
              <Icon name="slider-arrow" />
            </div>
            <div class="slider-arrow-prev" ref={prevEl} onClick={() => swiper()?.slidePrev()}>
              <Icon name="slider-arrow" />
            </div>
            <div class="slider-pagination" ref={pagEl}></div>
          </div>
        </Show>
      </div>
    </div>
  )
}
