<script lang="ts">
export default {
  name: 'Details'
}
</script>

<script setup lang="ts">
import Info from "./components/Info/Info.vue";
import GetThere from "./components/GetThere/GetThere.vue";
import Philosophy from "./components/Philosophy/Philosophy.vue";

const route = useRoute()
const router = useRouter()

const text = computed(() => {
  if (route.query.page === '2') {
    return 'подробно'
  }

  if (route.query.page === '3') {
    return 'где мы есть'
  }

  return 'во что мы мерим'
})

const changePage = () => {
  let number = Number(route.query.page)
  number += 1
  router.replace({name: 'details', query: {page: number}})
}
</script>

<template>
  <div class="details">
    <div class="details__logo">
      <img src="@/assets/images/logo.png" alt="logo">
      <div class="details__links">
        <RouterLink :to="{ name: 'home' }">rлавная</RouterLink>
        <span>|</span>
        <p>{{ text }}</p>
        <span v-if="route.query.page !== '3'">|</span>
        <button @click="changePage" v-if="route.query.page !== '3'">далее</button>
      </div>
    </div>
    <div class="details__divider"/>
    <div class="details__content">
      <Philosophy v-if="route.query.page === '1'"/>
      <Info v-else-if="route.query.page === '2'"/>
      <GetThere v-else/>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Details.scss"></style>
<style lang="scss" scoped src="./Details.desktop.scss"></style>
<style lang="scss" scoped src="./Details.mobile.scss"></style>
