<script lang="ts">
export default {
  name: 'RegistrationNumber'
}
</script>

<script setup lang="ts">
import {query, collection, getDocs} from 'firebase/firestore'
import {db} from '@/services/firebase'

import emailjs from 'emailjs-com';
import login from "@/views/Login.vue";

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

const sendEmail = (number, email) => {
  const templateParams = {
    to: email,
    subject: 'Регистрация на Урочище 2024',
    message: `
    Ты зарегистрирован(а) на гонку Урочище 2024.<br/>
    Номер участника: ${number} <br/>
    Даты: 2024.07.19 - 2024.07.21 <br/>
    Место: 56.373234 84.962397 <br/>
    Стоимость для участников: $ <br/>
    Реквизиты для оплаты: [номер карты/банк/qr] <br/>
    <span style="text-decoration: underline">при оплате указывай номер участника в комментарии к платежу</span> <br/>
    По всем вопросам: +7 (3822) 77-99-10
<!--    Оплатить: <img src="https://s541vla.storage.yandex.net/rdisk/7c2190e5352de99e1d4e70f50a17b8bf5d7027fa85b20f46cd4b7e06fd6d3fec/6665ea99/4Vt41AMDvZ9eyQgEKS_sYSPTxuhfHm3rIG4SVnVJPZ212S3yX4s_tJk_JjTXOHLmwY2z4DL9gF6whwAmq_d88g==?uid=398863231&filename=payment.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=398863231&fsize=2501&hid=7f9e356169ff01400788b0f7985e0871&media_type=image&tknv=v2&etag=2c5a79532a9b8bbb102273b2541f0833&ts=61a789eed1840&s=521ab0904af30e988fe993920cd070e38e22606115444c5af154af5ce76a9aab&pb=U2FsdGVkX18JbEL-jl1A9oO8e4NocOnZa41y5JO45NDn2QlTpC5WNGoIiwfBkLcgFIRPe9vcEFpN7OtVGXD9BGnsA-esqGXXZYDlA11y5Lo" alt="qr" width="200" height="200">-->
    `
  }

  try {
    emailjs.send('service_7nte8nd', 'urochishe2024', templateParams, 'user_Q62B7RRlfcIcFCktKXEDM')
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
