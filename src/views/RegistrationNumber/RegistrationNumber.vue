<script lang="ts">
export default {
  name: 'RegistrationNumber'
}
</script>

<script setup lang="ts">
import {query, collection, getDocs} from 'firebase/firestore'
import {db} from '@/services/firebase'

const route = useRoute()

const number = ref(null)
const riders = ref([])
const isPageLoaded = ref(false)

const newRegistration = ref(route.query.newRegistration)

const riderNumber = computed(() => {
  return riders.value.length ? riders.value.length - 1 : ''
})

let sentEmails = 0

const getNoun = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

const sendEmail = () => {
  sentEmails += 1
  if (sentEmails <= 1) {
    console.log('SEND EMAIL')
  }
}

onBeforeMount(async () => {
  const email = localStorage.getItem('email')

  let emails = []

  const queryEmails = await query(collection(db, 'emails'))
  const queryRiders = await query(collection(db, 'riders'))

  const docsEmails = await getDocs(queryEmails)
  const docsRiders = await getDocs(queryRiders)

  docsEmails.forEach((doc: any) => {
    emails.push(doc.data())
  })

  docsRiders.forEach((doc: any) => {
    riders.value.push(doc.data())
  })

  const foundEmail = emails.find((el) => el.email === email)

  if (foundEmail) {
    number.value = foundEmail.number
  }

  isPageLoaded.value = true
})

</script>

<template>
  <div class="registration-number" v-if="isPageLoaded">
    <h1 v-if="newRegistration">Ты зарегистрирован(а) на гонку Урочище</h1>
    <h1 v-else>Хорош, Ты уже зарегистрирован(а)
      <br>
      <span v-if="Number(riderNumber) > 0">Ты, и еще {{ riderNumber }} {{ getNoun(Number(riderNumber), 'участник', 'участника', 'участников') }}</span>
      <br>
      <span v-if="Number(riderNumber) > 0">твой номер</span>
    </h1>

    <h2 v-if="newRegistration">твой номер участника</h2>
    <h2 v-else>твой номер</h2>

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
