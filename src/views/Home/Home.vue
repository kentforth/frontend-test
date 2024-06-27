<script lang="ts">
export default {
  name: 'Home'
}
</script>

<script setup lang="ts">
import {db} from '@/services/firebase'
import {query, collection, getDocs, addDoc} from 'firebase/firestore'

const router = useRouter()

const foundEmail = ref(null)
const isRegistrationFinished = ref(false)

const topLinks = [
  {
    id: 1,
    page: '1',
    title: 'во что мы верим',
  },
  {
    id: 2,
    page: '2',
    title: 'подробно',
  },
  {
    id: 3,
    page: '3',
    title: 'где мы есть',
  }
]

const bottomLinks = [
  {
    id: 1,
    link: 'registration',
    title: 'регистрация',
  },
  {
    id: 2,
    link: 'sponsors',
    title: 'кто в деле',
  },
  {
    id: 3,
    link: 'heritage',
    title: 'наследие',
  }
]

onBeforeMount(async () => {
  const email = localStorage.getItem('email')

  let emails = []

  const queryEmails = await query(collection(db, 'emails'))

  const docsEmails = await getDocs(queryEmails)

  docsEmails.forEach((doc: any) => {
    emails.push(doc.data())
  })

  foundEmail.value = emails.find((el) => el.email === email)
})

const goToPage = (name: string) => {
  if (isRegistrationFinished.value && !foundEmail.value && name === 'registration') {
    return
  }

  router.push({name: name})
}

</script>

<template>
  <div class="home container">
    <img src="@/assets/images/home/poster.png" alt="poster" class="home__poster">

    <div class="home__content">
      <div class="home__top">
        <RouterLink
          v-for="link in topLinks" :key="link.id"
          :to="{ name: 'details', query: { page: link.page}}"
          class="home__link"
        >
          {{ link.title }}
        </RouterLink>
      </div>
      <img src="@/assets/images/logo.png" alt="logo" class="home__logo">
      <div class="home__bottom">
        <button
          v-for="link in bottomLinks"
          :key="link.id"
          class="home__link"
          @click="goToPage(link.link)"
        >
          {{ link.title }}
          <p>{{ link.subTitle }}</p>
        </button>
        <p class="home__finished" v-if="isRegistrationFinished">лучше никогда чем поздно<br>регистрация закрыта</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Home.scss"></style>

<style lang="scss" scoped src="./Home.desktop.scss"></style>

<style lang="scss" scoped src="./Home.mobile.scss"></style>
