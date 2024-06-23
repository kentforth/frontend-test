<script lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';

export default {
  name: 'Sponsors',
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<script setup lang="ts">
// Import Swiper styles
import 'swiper/css';

// import required modules
import {Keyboard, Mousewheel} from 'swiper/modules';

import ded from '@/assets/images/sponsors/ded.png'
import hog from '@/assets/images/sponsors/hog.png'
import noji from '@/assets/images/sponsors/noji.png'
import gosha from '@/assets/images/sponsors/gosha.png'
import shulz from '@/assets/images/sponsors/shulz.png'
import fatrat from '@/assets/images/sponsors/fatrat.png'
import daleko from '@/assets/images/sponsors/daleko.png'
import yarbeg from '@/assets/images/sponsors/yarbeg.png'
import neutrino from '@/assets/images/sponsors/neutrino.png'
import sarmatian from '@/assets/images/sponsors/sarmatian.png'
import niceToTrip from '@/assets/images/sponsors/nice-to-trip.png'

const sponsors = [
  {
    id: 1,
    name: 'shulz',
    text: `Российский производитель рам и <br>велосипедов из Санкт-Петербурга`,
    logo: shulz,
    link: 'https://shulz.ru/catalog/'
  },
  {
    id: 2,
    name: 'nice-to-trip',
    text: 'Мастерская по пошиву сумок для <br> приключений. Садись и едь, мы поможем!',
    logo: niceToTrip,
    link: 'https://vk.com/nice_to_trip'
  },
  {
    id: 3,
    name: 'neutrino',
    text: 'Производитель компонентов для <br> велосипедов. Наша продукция разработана, протестирована и изготовлена в России, <br>Екатеринбург',
    logo: neutrino,
    link: 'https://vk.com/neutrino_components'
  },
  {
    id: 4,
    name: 'gosha',
    text: 'Мастерская GOSHA OREKHOV <br> BAGS это место в <br>Санкт-Петербурге, где мы <br>создаем наши рюкзаки и <br>сумки уже 13 лет',
    logo: gosha,
    link: 'https://vk.com/gobags',
    narrow: true
  },
  {
    id: 5,
    name: 'fatrat',
    text: 'Качественные сумки для вас и ваших <br>велосипедов. CORDURA / YKK / WOOJIN / <br>APRI / ITGF',
    logo: fatrat,
    link: 'https://vk.com/fatratbags'
  },
  {
    id: 6,
    name: 'daleko',
    text: 'Single man manufacturing, как говорится. Шью сам,<br> вдохновляюсь лидерами <br>индустрии, реализую свои <br>идеи в сумках для <br>велосипеда',
    logo: daleko,
    link: 'https://vk.com/dalekodolgo_store',
    narrow: true
  },
  {
    id: 7,
    name: 'noji',
    text: 'Наш магазин предлагает ножи и <br>необходимые инструменты для выживания <br>как в лесу, так и в городских джунглях. В<br> наличии и под заказ',
    logo: noji,
    link: 'https://vk.com/knifetomsk'
  },
  {
    id: 8,
    name: 'yarbeg',
    text: 'Сумки и рюкзаки для велосипедистов и туристов. Сделано в Сибири',
    logo: yarbeg,
    link: 'https://vk.com/yarbag24',
    narrow: true
  },
  {
    id: 9,
    name: 'ded',
    text: 'Индпошив (и просто пошив) всяческой <br>снаряги, иногда одежды, а также ресайкл,<br>реюз, апсайкл и другие непонятные термины <br>словеса',
    logo: ded,
    link: 'https://vk.com/yedykdedy'
  },
  {
    id: 10,
    name: 'hog',
    text: 'Мы шьём сумки для <br>велосипедов👌 городские, для путешествий, кастом',
    logo: hog,
    link: 'https://vk.com/hedgehoggbags',
    narrow: true
  },
  {
    id: 11,
    name: 'sarmatian',
    text: 'Качественное снаряжение и <br>сумки для приключений из <br>Алматы',
    logo: sarmatian,
    link: 'https://vk.com/sarmatian_ways',
    narrow: true
  }
]

const modules = [Keyboard, Mousewheel]

const breakpoints = ref({
  600: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3.5,
    spaceBetween: 50
  },
  1440: {
    slidesPerView: 4.5,
    spaceBetween: 50
  }
})
</script>

<template>
  <div class="sponsors">
    <swiper
      :modules="modules"
      :breakpoints="breakpoints"
      :keyboard="{ enabled: true }"
      :mousewheel="{ enabled: true }"
      class="sponsors__swiper"
    >
      <swiper-slide v-for="sponsor in sponsors" :key="sponsor.id" class="sponsors__item">
        <a :href="sponsor.link" target="_blank" class="sponsors__image-wrapper">
          <img :src="sponsor.logo" :alt="sponsor.name" :class="`sponsors__logo-${sponsor.name}`">
        </a>

        <p v-html=sponsor.text :class="sponsor.narrow ? 'sponsors__narrow' : ''"></p>
      </swiper-slide>
    </swiper>
    <div class="sponsors__links">
      <RouterLink :to="{ name: 'home'}">
        главная
      </RouterLink>
      <span>|</span>
      <p>спонсоры</p>
      <span>|</span>
      <RouterLink :to="{ name: 'sound'}">
        саунд
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Sponsors.scss"></style>

<style lang="scss" scoped src="./Sponsors.desktop.scss"></style>
