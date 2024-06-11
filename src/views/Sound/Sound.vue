<script lang="ts">
export default {
  name: 'Sound'
}
</script>

<script setup lang="ts">
import sleepwalker from '@/assets/images/sound/sleepwalker.png'
import dragonBlood from '@/assets/images/sound/dragon-blood.png'

const bands = [
  {
    id: 1,
    name: 'dragon-blood',
    text: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    image: dragonBlood
  },
  {
    id: 2,
    name: 'sleepwalker',
    text: 'Sed ut perspiciatis, unde omnis iste natus error sit vole dicta sunt, explicabo.',
    image: sleepwalker
  }
]
</script>

<template>
  <div class="sound">
    <div class="sound__content">
      <div class="sound__item" v-for="band in bands" :key="band.id">
        <div class="sound__image-wrapper">
          <img :src="band.image" :alt="band.name" :class="`sound__image-${band.name}`">
        </div>
        <p>{{ band.text }}</p>
      </div>
    </div>
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
