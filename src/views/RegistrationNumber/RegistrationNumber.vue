<script lang="ts">
export default {
  name: 'RegistrationNumber'
}
</script>

<script setup lang="ts">
/*import {query, collection, getDocs} from 'firebase/firestore'
import {db} from '@/services/firebase'*/
const route = useRoute()

const number = ref(null)

const newRegistration = ref(route.query.newRegistration)

const sendEmail = () => {
  console.log('SEND EMAIL')
}

/*const hasEmail = ref(false)
const isPageLoaded = ref(false)*/

/*onBeforeMount(async () => {
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
})*/

</script>

<template>
  <div class="registration-number">
    <h1>Ты зарегистрирован[а] на гонку урочище</h1>

    <h2>твой номер участника</h2>

    <div class="registration-number__number">
      <span>{{ number }}</span>
    </div>

    <p class="registration-number__email" v-if="newRegistration">на адрес твоей электронной почты отправлены реквизиты для оплаты и вся необходимая информация</p>
    <button v-else class="registration-number__email" @click="sendEmail">отправить информацию повторно</button>

    <div class="registration-number__links">
      <RouterLink :to="{ name: 'home' }">главная</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./RegistrationNumber.scss"></style>
