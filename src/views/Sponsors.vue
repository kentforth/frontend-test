<script lang="ts">
export default {
  name: 'Sponsors'
}
</script>

<script setup lang="ts">
import shulz from '@/assets/images/sponsors/shulz.png'
import fatrat from '@/assets/images/sponsors/fatrat.png'
import sarmatian from '@/assets/images/sponsors/sarmatian.png'
import niceToTrip from '@/assets/images/sponsors/nice-to-trip.png'

const sponsors = [
  {
    id: 1,
    name: 'sarmatian',
    text: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    logo: sarmatian,
  },
  {
    id: 2,
    name: 'shulz',
    text: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    logo: shulz,
  },
  {
    id: 3,
    name: 'nice-to-trip',
    text: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    logo: niceToTrip,
  },
  {
    id: 4,
    name: 'fatrat',
    text: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    logo: fatrat,
  },
]
</script>

<template>
  <div class="sponsors">
    <div class="sponsors__content">
      <div class="sponsors__item" v-for="sponsor in sponsors" :key="sponsor.id">
        <img :src="sponsor.logo" :alt="sponsor.logo" :class="`sponsors__logo-${sponsor.name}`">
        <p>{{ sponsor.text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sponsors {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  &__logo {
    &-sarmatian {
      width: 200px;
    }

    &-shulz {
      width: 400px;
    }

    &-nice-to-trip {
      width: 200px;
    }

    &-fatrat {
      width: 300px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 40px;

    p {
      margin-top: 50px;
      font-size: 24px;
      text-align: center;
      justify-self: flex-start;
    }
  }
}
</style>
