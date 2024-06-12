<script lang="ts">
export default {
  name: 'RegistrationNumber'
}
</script>

<script setup lang="ts">
import {query, collection, getDocs} from 'firebase/firestore'
import {db} from '@/services/firebase'

const number = ref(23)
const hasEmail = ref(false)
const isPageLoaded = ref(false)

onBeforeMount(async () => {
  const email = localStorage.getItem('email')

  let emails = []

  const q = await query(collection(db, 'emails'))
  const docs = await getDocs(q)
  docs.forEach((doc: any) => {
    emails.push(doc.data())
  })

  const isEmailExist = emails.some((el) => el.email === email)

  if (isEmailExist) {
    hasEmail.value = true
  }

  isPageLoaded.value = true
})
</script>

<template>
  <div class="registration-number">
    <h1>Ты зарегистрирован[а] на гонку урочище</h1>

    <h2>твой номер участника</h2>

    <div class="registration-number__number">
      <span>{{ number }}</span>
    </div>

    <p class="registration-number__email">на адрес твоей электронной почты отправлены реквизиты для оплаты и вся необходимая информация</p>

    <div class="registration-number__links">
      <RouterLink :to="{ name: 'home' }">главная</RouterLink>
      <template v-if="!hasEmail && isPageLoaded">
        <span>|</span>
        <RouterLink :to="{ name: 'registration' }">регистрация</RouterLink>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./RegistrationNumber.scss"></style>
