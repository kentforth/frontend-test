<script lang="ts">

export default {
  name: 'Heritage',
  components: {
    Slide,
    Carousel
  }
}
</script>

<script setup lang="ts">
import one from '@/assets/images/heritage/2021.png'
import two from '@/assets/images/heritage/2022.png'
import four from '@/assets/images/heritage/2024.png'
import three from '@/assets/images/heritage/2023.png'

const router = useRouter()

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
    <!--    <carousel :items-to-show="3.5" class="heritage__images">
          <slide v-for="image in images" :key="image.id">
            <button @click="onClick(image.title)" class="heritage__button">
              <img :src="image.image" :alt="image.title" class="heritage__image">
              <p>{{ image.title }}</p>
            </button>
          </slide>
        </carousel>-->
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
