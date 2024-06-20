<script lang="ts">
export default {
  name: 'RegistrationNumber'
}
</script>

<script setup lang="ts">
import {db} from '@/services/firebase'
import {query, collection, getDocs, addDoc} from 'firebase/firestore'

const route = useRoute()

const number = ref(null)
const riders = ref([])
const emailTo = ref(null)
const isEmailSent = ref(false)
const isPageLoaded = ref(false)

const newRegistration = ref(route.query.newRegistration)

const riderNumber = computed(() => {
  return riders.value.length ? riders.value.length - 1 : ''
})

const isButtonVisible = computed(() => {
  return !newRegistration.value && isEmailSent.value === false
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

const onClick = () => {
  sentEmails += 1
  if (sentEmails <= 1) {
    sendEmail(number.value, emailTo.value)
    isEmailSent.value = true
  }
}

const sendEmail = async (number, email) => {
  const templateParams = {
    to: email,
    message: {
      subject: 'Регистрация на Урочище 2024',
      html: `
    Ты зарегистрирован(а) на гонку Урочище 2024.
    <br/>
    <br>
    Номер участника: ${number} <br/>
    Даты: 2024.07.19 - 2024.07.21<br/>
    Место: 56.373234 84.962397 <br/>
    Стоимость для участников: 3500р. <br/>
    Реквизиты для оплаты: <a href="https://www.tinkoff.ru/rm/franchuk.anton2/TX77Z93513/" target="_blank">оплата</a>
    <br/>
    По всем вопросам: <b>лс @snake454545</b>
    <br>
    <br>
    После оплаты, пожалуйста, сохраните скриншот оплаты у себя на телефоне.
    <br>
    Еще больше информации можно найти на <a href="https://urochishe2024.netlify.app/details?page=2" target="_blank">сайте</a> или в <a href="https://t.me/Urochishe2022">чате</a> для участников, там вы можете задать любые вопросы.
   `
    }
  }

  try {
    const emailbox = collection(db, 'emailbox')
    await addDoc(emailbox, templateParams)
    // emailjs.send('service_7nte8nd', 'urochishe2024', templateParams, 'user_Q62B7RRlfcIcFCktKXEDM')
  } catch (e) {
    console.error(e)
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
    emailTo.value = foundEmail.email
  }

  isPageLoaded.value = true
})

</script>

<template>
  <div class="registration-number" v-if="isPageLoaded">
    <h1 v-if="newRegistration">Ты зарегистрирован(а) на гонку Урочище
      <br>
      <br>
                               твой номер участника
    </h1>
    <h1 v-else>Хорош, Ты уже зарегистрирован(а)
      <br>
      <span v-if="Number(riderNumber) > 0">Ты, и еще {{ riderNumber }} {{ getNoun(Number(riderNumber), 'участник', 'участника', 'участников') }}</span>
      <br>
      <span>твой номер</span>
    </h1>

    <div class="registration-number__number">
      <span>{{ number }}</span>
    </div>

    <p class="registration-number__email" v-if="newRegistration">на адрес твоей электронной почты отправлены реквизиты для оплаты и вся необходимая информация</p>
    <button class="registration-number__email" @click="onClick" v-if="isButtonVisible">отправить информацию повторно</button>
    <p v-else-if="!isButtonVisible && !newRegistration" class="registration-number__email">отправлено</p>

    <div class="registration-number__links">
      <RouterLink :to="{ name: 'home' }">главная</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./RegistrationNumber.scss"></style>
