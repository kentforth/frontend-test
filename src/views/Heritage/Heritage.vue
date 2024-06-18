<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'

export default {
  name: 'Heritage',
  components: {
    Slide,
    Carousel,
    Pagination,
    Navigation
  }
}
</script>

<script setup lang="ts">
import one from '@/assets/images/heritage/2021.png'
import two from '@/assets/images/heritage/2022.png'
import four from '@/assets/images/heritage/2024.png'
import three from '@/assets/images/heritage/2023.png'

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

const options = {
  autoplay: 1000,
}

</script>

<template>
  <div class="heritage">
    <carousel :items-to-show="3.5" class="heritage__images">
      <slide v-for="image in images" :key="image.id">
        <RouterLink :to="{name: 'heritageItem', params: { year: image.title } }" class="heritage__link">
          <img :src="image.image" :alt="image.title" class="heritage__image">
          <p>{{ image.title }}</p>
        </RouterLink>
      </slide>
    </carousel>
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
