<script lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';

export default {
  name: 'Heritage',
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

import one from '@/assets/images/heritage/2021.png'
import two from '@/assets/images/heritage/2022.png'
import four from '@/assets/images/heritage/2024.png'
import three from '@/assets/images/heritage/2023.png'

const router = useRouter()

const modules = [Keyboard, Mousewheel]

const breakpoints = ref({
  200: {
    direction: 'vertical',
    spaceBetween: 50,
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

const images = [
  {
    id: 1,
    title: '2021',
    image: one
  },
  {
    id: 2,
    title: '2022',
    image: two
  },
  {
    id: 3,
    title: '2023',
    image: three
  },
  {
    id: 4,
    title: '2024',
    image: four
  }
]

const onClick = (title: string) => {
  if (title === '2024') {
    return
  }

  router.push({name: 'heritageItem', params: {year: title}})
}

</script>

<template>
  <div class="heritage">
    <swiper
      :modules="modules"
      :breakpoints="breakpoints"
      :keyboard="{ enabled: true }"
      :mousewheel="{ enabled: true }"
      class="heritage__swiper"
    >
      <swiper-slide v-for="image in images" :key="image.id" class="heritage__item">
        <button @click="onClick(image.title)" class="heritage__button">
          <img :src="image.image" :alt="image.title" class="heritage__image">
          <span>{{ image.title }}</span>
        </button>
      </swiper-slide>
    </swiper>

    <div class="heritage__links">
      <RouterLink :to="{ name: 'home'}">
        главная
      </RouterLink>
      <span>|</span>
      <p>наследие</p>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Heritage.scss"></style>

<style lang="scss" scoped src="./Heritage.mobile.scss"></style>
