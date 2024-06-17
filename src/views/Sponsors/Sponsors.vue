<script lang="ts">
export default {
  name: 'Sponsors'
}
</script>

<script setup lang="ts">
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
    text: 'Российский производитель рам и велосипедов из Санкт-Петербурга',
    logo: shulz,
  },
  {
    id: 2,
    name: 'nice-to-trip',
    text: 'Мастерская по пошиву сумок для приключений. Садись и едь, мы поможем!',
    logo: niceToTrip,
  },
  {
    id: 3,
    name: 'neutrino',
    text: 'Производитель компонентов для велосипедов. Наша продукция разработана, протестирована и изготовлена в России, Екатеринбург',
    logo: neutrino,
  },
  {
    id: 4,
    name: 'gosha',
    text: 'Мастерская GOSHA OREKHOV BAGS это место в Санкт-Петербурге, где мы создаем наши рюкзаки и сумки уже 13 лет',
    logo: gosha,
  },
  {
    id: 5,
    name: 'fatrat',
    text: 'Качественные сумки для вас и ваших велосипедов. CORDURA / YKK / WOOJIN / APRI / ITGF',
    logo: fatrat,
  },
  {
    id: 6,
    name: 'daleko',
    text: 'Single man manufacturing, как говорится. Шью сам, вдохновляюсь лидерами индустрии, реализую свои идеи в сумках для велосипеда',
    logo: daleko,
  },
  {
    id: 7,
    name: 'noji',
    text: 'Наш магазин предлагает ножи и необходимые инструменты для выживания как в лесу, так и в городских джунглях. В наличии и под заказ',
    logo: noji,
  },
  {
    id: 8,
    name: 'yarbeg',
    text: 'Сумки и рюкзаки для велосипедистов и туристов. Сделано в Сибири',
    logo: yarbeg,
  },
  {
    id: 9,
    name: 'ded',
    text: 'Индпошив (и просто пошив) всяческой снаряги, иногда одежды, а также ресайкл, реюз, апсайкл и другие непонятные термины словеса',
    logo: ded,
  },
  {
    id: 10,
    name: 'hog',
    text: 'Мы шьём сумки для велосипедов👌 городские, для путешествий, кастом',
    logo: hog,
  },
  {
    id: 11,
    name: 'sarmatian',
    text: 'Это не только снаряжение, это движение. Отражаясь эхом во времени, выезжая за порог родных территорий следующей ночью мы ставим палатку уже в совсем незнакомом месте, напоминая древний образ кочевника. Мы едем в новые места, где шипящий грунт под колесами, провожает нас все дальше и дальше, туда где ждут новые приключения.',
    logo: sarmatian,
  }
]
</script>

<template>
  <div class="sponsors">
    <div class="sponsors__content">
      <div class="sponsors__item" v-for="sponsor in sponsors" :key="sponsor.id">
        <div class="sponsors__image-wrapper">
          <img :src="sponsor.logo" :alt="sponsor.logo" :class="`sponsors__logo-${sponsor.name}`">
        </div>
        <p>{{ sponsor.text }}</p>
      </div>
    </div>
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
