<script lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';

export default {
  name: 'Sound',
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

import rat from '@/assets/images/sound/rat.png'
import amanita from '@/assets/images/sound/amanita.png'
import sleepwalker from '@/assets/images/sound/sleepwalker.png'
import dragonBlood from '@/assets/images/sound/dragon-blood.png'

const modules = [Keyboard, Mousewheel]

const breakpoints = ref({
  200: {
    direction: 'vertical',
    spaceBetween: 70,
    slidesPerView: 'auto'
  },
  600: {
    slidesPerView: 2,
    snapAlign: 'start',
  },
  1024: {
    slidesPerView: 3.5,
    snapAlign: 'start',
  }
})

const bands = [
  {
    id: 1,
    name: 'dragon-blood',
    link: 'https://vk.com/dragonsbloodofficial',
    text: 'Фэнтези dungeon synth из Санкт-Петербурга, так полюбившийся нам в прошлом году, презентуют свой новый альбом. От участников небезызвестных Beauty Of Sirin и КОЛЧАК',
    image: dragonBlood
  },
  {
    id: 2,
    name: 'sleepwalker',
    text: 'Drone Ambient полотна с гитарами, синтезаторами, кастомными педалями - полностью аналоговое звучание, уносящее в новое путешествие',
    link: 'https://vk.com/sleepwalkerproject',
    image: sleepwalker
  },
  {
    id: 3,
    name: 'amanita',
    link: 'https://vk.com/amanitaoverlord',
    text: 'Dungeon synth дуэт из Москвы, рассказывающий о приключениях Жабьего Короля. Впервые в наших землях с эксклюзивным выступлением',
    image: amanita
  },
  {
    id: 4,
    name: 'rat',
    link: 'https://vk.com/mother_rat',
    text: 'One-woman dungeon synth проект, посвященный вселенной "Хроник Нарнии" (К.С. Льюиса) и являющийся неофитом жанра, представит свой дебютный материал',
    image: rat
  }
]
</script>

<template>
  <div class="sound">
    <swiper
      :modules="modules"
      :breakpoints="breakpoints"
      :keyboard="{ enabled: true }"
      :mousewheel="{ enabled: true }"
      class="sound__swiper"
    >
      <swiper-slide v-for="band in bands" :key="band.id" class="sound__item">
        <a :href="band.link" target="_blank" class="sound__image-wrapper">
          <img :src="band.image" :alt="band.name" :class="`sound__image-${band.name}`">
        </a>

        <p>{{ band.text }}</p>
      </swiper-slide>
    </swiper>

    <div class="sound__links">
      <RouterLink :to="{ name: 'home'}">
        главная
      </RouterLink>
      <span>|</span>
      <RouterLink :to="{ name: 'sponsors'}">
        спонсоры
      </RouterLink>
      <span>|</span>
      <p>саунд</p>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Sound.scss"></style>

<style scoped lang="scss" src="./Sound.desktop.scss"></style>

<style scoped lang="scss" src="./Sound.mobile.scss"></style>
