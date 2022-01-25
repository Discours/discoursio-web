<script lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/svelte'
  import { Navigation } from 'swiper'
  import { shuffle } from '$lib/utils'
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
  export let shouts: Shout[]
  export let title = 'Выбор сообщества'
</script>

<div class="floor floor--important floor--slider">
  <div class="wide-container row">
    <h2 class="col-12">{title}</h2>
    <Swiper
      modules={[Navigation]}
      spaceBetween={8}
      slidesPerView={1.6666}
      navigation
      centeredSlides
      loop
    >
      {#each shuffle(shouts) as shout}
        <SwiperSlide>
          <ShoutCard {shout} additionalClass="shout-card--with-cover" />
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>
</div>

<style lang="scss" global>
  .swiper-button-prev,
  .swiper-button-next {
    height: 100%;
    transform: translate(0);
    top: 0;
    width: 21%;

    &:after {
      color: #fff;
    }
  }

  .swiper-button-prev {
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.9) 100%
    );
    justify-content: flex-start;
    left: 0;

    &:after {
      margin-left: 5rem;
    }
  }

  .swiper-button-next {
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    justify-content: flex-end;
    right: 0;

    &:after {
      margin-right: 5rem;
    }
  }
</style>
