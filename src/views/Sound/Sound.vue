<script lang="ts">
export default {
  name: 'Sound'
}
</script>

<script setup lang="ts">
import rat from '@/assets/images/sound/rat.png'
import amanita from '@/assets/images/sound/amanita.png'
import sleepwalker from '@/assets/images/sound/sleepwalker.png'
import dragonBlood from '@/assets/images/sound/dragon-blood.png'

const bands = [
  {
    id: 1,
    name: 'dragon-blood',
    text: 'Фэнтези dungeon synth из Санкт-Петербурга, так полюбившийся нам в прошлом году, презентуют свой новый альбом. От участников небезызвестных Beauty Of Sirin и КОЛЧАК',
    image: dragonBlood
  },
  {
    id: 2,
    name: 'sleepwalker',
    text: 'Drone Ambient полотна с гитарами, синтезаторами, кастомными педалями - полностью аналоговое звучание, уносящее в новое путешествие',
    image: sleepwalker
  },
  {
    id: 3,
    name: 'amanita',
    text: 'Dungeon synth дуэт из Москвы, рассказывающий о приключениях Жабьего Короля. Впервые в наших землях с эксклюзивным выступлением',
    image: amanita
  },
  {
    id: 4,
    name: 'rat',
    text: 'One-woman dungeon synth проект, посвященный вселенной "Хроник Нарнии" (К.С. Льюиса) и являющийся неофитом жанра, представит свой дебютный материал',
    image: rat
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
